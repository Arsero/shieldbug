import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1618911519077 implements MigrationInterface {
    name = 'InitialMigration1618911519077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_project" ("role" text NOT NULL, "userId" integer NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "PK_2a37107e0b3bdb06b4920a64bbc" PRIMARY KEY ("userId", "projectId"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "created" TIMESTAMP NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "issue" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "lastUpdate" TIMESTAMP NOT NULL, "state" text NOT NULL, "priority" text NOT NULL, "projectId" uuid, "userId" integer, CONSTRAINT "PK_f80e086c249b9f3f3ff2fd321b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_project" ADD CONSTRAINT "FK_b88a18e4faeea3bce60d70a4ae3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_project" ADD CONSTRAINT "FK_cb5415b5e54f476329451212e9b" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_be30b91466b730c5e25f1181f79" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_9ec9992868e098e4e861a1aa9df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_9ec9992868e098e4e861a1aa9df"`);
        await queryRunner.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_be30b91466b730c5e25f1181f79"`);
        await queryRunner.query(`ALTER TABLE "user_project" DROP CONSTRAINT "FK_cb5415b5e54f476329451212e9b"`);
        await queryRunner.query(`ALTER TABLE "user_project" DROP CONSTRAINT "FK_b88a18e4faeea3bce60d70a4ae3"`);
        await queryRunner.query(`DROP TABLE "issue"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "user_project"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
