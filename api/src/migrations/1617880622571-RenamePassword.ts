import {MigrationInterface, QueryRunner} from "typeorm";

export class RenamePassword1617880622571 implements MigrationInterface {
    name = 'RenamePassword1617880622571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "hashPassword" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "hashPassword"`);
    }

}
