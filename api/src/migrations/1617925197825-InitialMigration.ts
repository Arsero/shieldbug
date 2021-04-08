import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1617925197825 implements MigrationInterface {
    name = 'InitialMigration1617925197825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "ownerId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "issue" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "lastUpdate" TIMESTAMP NOT NULL, "state" integer NOT NULL, "priority" integer NOT NULL, "projectId" uuid, "userId" integer, CONSTRAINT "PK_f80e086c249b9f3f3ff2fd321b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_projects_project" ("userId" integer NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "PK_26a180af1ec7a8550f5c374fcd8" PRIMARY KEY ("userId", "projectId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_79daf0d2be103f4c30c77ddd6b" ON "user_projects_project" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_936561888bfd63d01c79fe415c" ON "user_projects_project" ("projectId") `);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_be30b91466b730c5e25f1181f79" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_9ec9992868e098e4e861a1aa9df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_projects_project" ADD CONSTRAINT "FK_79daf0d2be103f4c30c77ddd6be" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_projects_project" ADD CONSTRAINT "FK_936561888bfd63d01c79fe415c3" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_projects_project" DROP CONSTRAINT "FK_936561888bfd63d01c79fe415c3"`);
        await queryRunner.query(`ALTER TABLE "user_projects_project" DROP CONSTRAINT "FK_79daf0d2be103f4c30c77ddd6be"`);
        await queryRunner.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_9ec9992868e098e4e861a1aa9df"`);
        await queryRunner.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_be30b91466b730c5e25f1181f79"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed"`);
        await queryRunner.query(`DROP INDEX "IDX_936561888bfd63d01c79fe415c"`);
        await queryRunner.query(`DROP INDEX "IDX_79daf0d2be103f4c30c77ddd6b"`);
        await queryRunner.query(`DROP TABLE "user_projects_project"`);
        await queryRunner.query(`DROP TABLE "issue"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
