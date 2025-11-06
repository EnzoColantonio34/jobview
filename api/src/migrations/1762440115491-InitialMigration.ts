import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1762440115491 implements MigrationInterface {
    name = 'InitialMigration1762440115491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("uuid" varchar PRIMARY KEY NOT NULL, "first_name" varchar(50), "last_name" varchar(50), "username" varchar(50) NOT NULL, "email" varchar(100) NOT NULL, "password" varchar(50) NOT NULL, "birth_date" datetime NOT NULL, "phone_number" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "current_hashed_refresh_token" varchar, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
