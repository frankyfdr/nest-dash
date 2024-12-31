import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaMigration1735594668418 implements MigrationInterface {
  name = 'SchemaMigration1735594668418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."users_role_enum" AS ENUM ('user', 'admin', 'superadmin')
    `);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "profileImg" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "icon" character varying, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "place_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "icon" character varying, CONSTRAINT "PK_48ffb58b97e97bd108e38cad445" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "place" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "imageUrl" character varying, "cost" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "placeTypeId" integer, "categoryId" integer, CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "place" ADD CONSTRAINT "FK_49c8941d0be5d8e5c2cac3b6c5a" FOREIGN KEY ("placeTypeId") REFERENCES "place_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "place" ADD CONSTRAINT "FK_4a3c2427bea45ebc6a549887663" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "place" DROP CONSTRAINT "FK_4a3c2427bea45ebc6a549887663"`,
    );
    await queryRunner.query(
      `ALTER TABLE "place" DROP CONSTRAINT "FK_49c8941d0be5d8e5c2cac3b6c5a"`,
    );
    await queryRunner.query(`DROP TABLE "place"`);
    await queryRunner.query(`DROP TABLE "place_types"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
