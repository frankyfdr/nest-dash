import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPlaceLocation1735597914208 implements MigrationInterface {
  name = 'AddPlaceLocation1735597914208';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "place" ADD "location" geometry(Point,4326) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "place" DROP COLUMN "location"`);
  }
}
