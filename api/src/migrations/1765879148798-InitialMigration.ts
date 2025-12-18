import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1765879148798 implements MigrationInterface {
    name = 'InitialMigration1765879148798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" varchar(36) PRIMARY KEY NOT NULL, "first_name" varchar(50), "last_name" varchar(50), "username" varchar(50) NOT NULL, "email" varchar(100) NOT NULL, "password" varchar(50) NOT NULL, "birth_date" datetime NOT NULL, "phone_number" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "current_hashed_refresh_token" varchar, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("company_id" varchar(36) PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "city" varchar(50), "zip_code" varchar(50), "address" varchar(50), "address_extra" varchar(50), "email" varchar(50) NOT NULL, "phone_number" varchar(50) NOT NULL, "deleted_at" datetime, "user_id" varchar(36), CONSTRAINT "UQ_7e7a9a297f537ead2cdb07d1182" UNIQUE ("name", "user_id"))`);
        await queryRunner.query(`CREATE TABLE "interviews" ("interview_id" varchar(36) PRIMARY KEY NOT NULL, "label" varchar(50) NOT NULL, "state" varchar(50), "email_sent_date" datetime, "interview_date" datetime, "remind_date" datetime, "company_id" varchar(36))`);
        await queryRunner.query(`CREATE TABLE "temporary_companies" ("company_id" varchar(36) PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "city" varchar(50), "zip_code" varchar(50), "address" varchar(50), "address_extra" varchar(50), "email" varchar(50) NOT NULL, "phone_number" varchar(50) NOT NULL, "deleted_at" datetime, "user_id" varchar(36), CONSTRAINT "UQ_7e7a9a297f537ead2cdb07d1182" UNIQUE ("name", "user_id"), CONSTRAINT "FK_ee0839cba07cb0c52602021ad4b" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_companies"("company_id", "name", "city", "zip_code", "address", "address_extra", "email", "phone_number", "deleted_at", "user_id") SELECT "company_id", "name", "city", "zip_code", "address", "address_extra", "email", "phone_number", "deleted_at", "user_id" FROM "companies"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`ALTER TABLE "temporary_companies" RENAME TO "companies"`);
        await queryRunner.query(`CREATE TABLE "temporary_interviews" ("interview_id" varchar(36) PRIMARY KEY NOT NULL, "label" varchar(50) NOT NULL, "state" varchar(50), "email_sent_date" datetime, "interview_date" datetime, "remind_date" datetime, "company_id" varchar(36), CONSTRAINT "FK_7aed7c8457ff7ffbef4cb221d1f" FOREIGN KEY ("company_id") REFERENCES "companies" ("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_interviews"("interview_id", "label", "state", "email_sent_date", "interview_date", "remind_date", "company_id") SELECT "interview_id", "label", "state", "email_sent_date", "interview_date", "remind_date", "company_id" FROM "interviews"`);
        await queryRunner.query(`DROP TABLE "interviews"`);
        await queryRunner.query(`ALTER TABLE "temporary_interviews" RENAME TO "interviews"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interviews" RENAME TO "temporary_interviews"`);
        await queryRunner.query(`CREATE TABLE "interviews" ("interview_id" varchar(36) PRIMARY KEY NOT NULL, "label" varchar(50) NOT NULL, "state" varchar(50), "email_sent_date" datetime, "interview_date" datetime, "remind_date" datetime, "company_id" varchar(36))`);
        await queryRunner.query(`INSERT INTO "interviews"("interview_id", "label", "state", "email_sent_date", "interview_date", "remind_date", "company_id") SELECT "interview_id", "label", "state", "email_sent_date", "interview_date", "remind_date", "company_id" FROM "temporary_interviews"`);
        await queryRunner.query(`DROP TABLE "temporary_interviews"`);
        await queryRunner.query(`ALTER TABLE "companies" RENAME TO "temporary_companies"`);
        await queryRunner.query(`CREATE TABLE "companies" ("company_id" varchar(36) PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "city" varchar(50), "zip_code" varchar(50), "address" varchar(50), "address_extra" varchar(50), "email" varchar(50) NOT NULL, "phone_number" varchar(50) NOT NULL, "deleted_at" datetime, "user_id" varchar(36), CONSTRAINT "UQ_7e7a9a297f537ead2cdb07d1182" UNIQUE ("name", "user_id"))`);
        await queryRunner.query(`INSERT INTO "companies"("company_id", "name", "city", "zip_code", "address", "address_extra", "email", "phone_number", "deleted_at", "user_id") SELECT "company_id", "name", "city", "zip_code", "address", "address_extra", "email", "phone_number", "deleted_at", "user_id" FROM "temporary_companies"`);
        await queryRunner.query(`DROP TABLE "temporary_companies"`);
        await queryRunner.query(`DROP TABLE "interviews"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
