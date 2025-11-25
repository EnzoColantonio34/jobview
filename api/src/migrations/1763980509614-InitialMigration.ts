import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1763980509614 implements MigrationInterface {
    name = 'InitialMigration1763980509614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companies" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "city" varchar(50), "zip_code" varchar(50), "address" varchar(50), "address_extra" varchar(50), "email" varchar(50) NOT NULL, "phone_number" varchar(50) NOT NULL, "user_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "users" ("uuid" varchar PRIMARY KEY NOT NULL, "first_name" varchar(50), "last_name" varchar(50), "username" varchar(50) NOT NULL, "email" varchar(100) NOT NULL, "password" varchar(50) NOT NULL, "birth_date" datetime NOT NULL, "phone_number" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "current_hashed_refresh_token" varchar, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"))`);
        await queryRunner.query(`CREATE TABLE "temporary_companies" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "city" varchar(50), "zip_code" varchar(50), "address" varchar(50), "address_extra" varchar(50), "email" varchar(50) NOT NULL, "phone_number" varchar(50) NOT NULL, "user_id" varchar, CONSTRAINT "FK_ee0839cba07cb0c52602021ad4b" FOREIGN KEY ("user_id") REFERENCES "users" ("uuid") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_companies"("uuid", "name", "city", "zip_code", "address", "address_extra", "email", "phone_number", "user_id") SELECT "uuid", "name", "city", "zip_code", "address", "address_extra", "email", "phone_number", "user_id" FROM "companies"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`ALTER TABLE "temporary_companies" RENAME TO "companies"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" RENAME TO "temporary_companies"`);
        await queryRunner.query(`CREATE TABLE "companies" ("uuid" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "city" varchar(50), "zip_code" varchar(50), "address" varchar(50), "address_extra" varchar(50), "email" varchar(50) NOT NULL, "phone_number" varchar(50) NOT NULL, "user_id" varchar)`);
        await queryRunner.query(`INSERT INTO "companies"("uuid", "name", "city", "zip_code", "address", "address_extra", "email", "phone_number", "user_id") SELECT "uuid", "name", "city", "zip_code", "address", "address_extra", "email", "phone_number", "user_id" FROM "temporary_companies"`);
        await queryRunner.query(`DROP TABLE "temporary_companies"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }

}
