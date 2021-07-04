import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';

const todoCreatePayload = { text: 'todoText' };
const todoModifyPayload = { text: 'new', checked: true };
const wrongId = 'undefined';

describe('TodosController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/todos (GET) - success', async (done) => {
    return request(app.getHttpServer())
      .get('/todos')
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeGreaterThanOrEqual(0);
        done();
      });
  });

  it('/todos (POST) - success', () => {
    return request(app.getHttpServer())
      .post('/todos')
      .send(todoCreatePayload)
      .expect(201);
  });

  it('/todos (POST) - failed', async (done) => {
    return request(app.getHttpServer())
      .post('/todos')
      .send({})
      .expect(400)
      .then(({ body }: request.Response) => {
        expect(body.message.length).toBeGreaterThanOrEqual(1);
        done();
      });
  });

  it('/todos/:id (PATCH) - success', async (done) => {
    const req = request(app.getHttpServer());
    req.post('/todos').send(todoCreatePayload);

    const res = await req.get('/todos');
    const todoId = res.body[0]._id;

    return req
      .patch(`/todos/${todoId}`)
      .send(todoModifyPayload)
      .expect(200)
      .then(() => done());
  });

  it('/todos/:id (PATCH) - failed', () => {
    return request(app.getHttpServer())
      .patch(`/todos/${wrongId}`)
      .send({
        text: '1',
      })
      .expect(400);
  });

  it('/todos/:id (DELETE) - success', async (done) => {
    const req = request(app.getHttpServer());
    req.post('/todos').send(todoCreatePayload);

    const res = await req.get('/todos');
    const todoId = res.body[0]._id;

    await req.delete(`/todos/${todoId}`).expect(200);
    done();
  });

  it('/todos/:id (DELETE) - failed', () => {
    return request(app.getHttpServer()).delete(`/todos/${wrongId}`).expect(400);
  });

  afterAll(() => {
    disconnect();
  });
});
