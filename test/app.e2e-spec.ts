import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LaboratoryModule } from './../src/laboratory/laboratory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratory } from './../src/laboratory/entities/laboratory.entity';
import { Exam } from './../src/laboratory/entities/exam.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let laboratoryId: string;
  let examId: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'wa_postgres',
          port: 5432,
          dropSchema: true,
          username: 'wa-lab',
          password: 'wa-lab',
          database: 'wa-lab-test',
          synchronize: true,
          entities: [Laboratory, Exam],
        }),
        LaboratoryModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  it('/laboratories (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/laboratories')
      .send({
        name: 'teste',
        address: 'teste',
        number: 'teste',
        complement: 'teste',
        city: 'teste',
        neighborhood: 'teste',
        state: 'MT',
        zipCode: '78051213',
      })
      .expect(201);
    laboratoryId = response.body.uuid;
  });

  it('/exams (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/exams')
      .send({
        name: 'Exame teste',
        type: 'image',
      })
      .expect(201);
    examId = response.body.uuid;
  });

  it('/laboratories (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/laboratories')
      .expect(200);
    expect(response.body).toHaveLength(1);
  });

  it('/laboratories/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/laboratories/8d1d3bf8-5f00-4d85-97ff-37c2fa9d321a')
      .expect(404);
  });

  it('/laboratories/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/laboratories/${laboratoryId}`)
      .expect(200);
  });

  it('/laboratories/:id/exams/:examUuid (POST)', () => {
    return request(app.getHttpServer())
      .post(`/laboratories/${laboratoryId}/exams/${examId}`)
      .expect(201);
  });

  it('/exams/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete(`/exams/${examId}`).expect(200);
  });

  it('/laboratories/:id/exams/:examUuid (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/laboratories/${laboratoryId}/exams/${examId}`)
      .expect(404);
  });

  it('/exams/:id (POST)', () => {
    return request(app.getHttpServer()).post(`/exams/${examId}`).expect(201);
  });

  it('/laboratories/:id/exams/:examUuid (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/laboratories/${laboratoryId}/exams/${examId}`)
      .expect(200);
  });

  it('/laboratories/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/laboratories/8d1d3bf8-5f00-4d85-97ff-37c2fa9d321a')
      .expect(404);
  });

  it('/laboratories/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/laboratories/${laboratoryId}`)
      .expect(200);
  });

  it('/laboratories (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/laboratories')
      .expect(200);
    expect(response.body).toHaveLength(0);
  });

  it('/laboratories/:id/exams/:examUuid (POST)', () => {
    return request(app.getHttpServer())
      .post(`/laboratories/${laboratoryId}/exams/${examId}`)
      .expect(404);
  });
  it('/laboratories/:id (POST)', () => {
    return request(app.getHttpServer())
      .post(`/laboratories/${laboratoryId}`)
      .expect(201);
  });
});
