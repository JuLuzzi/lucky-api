import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1629752154534 implements MigrationInterface {
    name = 'firstMigration1629752154534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country_id" integer NOT NULL, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "city_id" integer NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(20) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "user_id" integer NOT NULL, "address_id" integer NOT NULL, CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_4aa0d9a52c36ff93415934e2d2b" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_baebeb388634106e4cbb46192b9" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_e025c989126e077b0b8b61a7f3c" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO countries(id, name) VALUES ('1', 'Argentina')`);
        await queryRunner.query(`INSERT INTO countries(id, name) VALUES ('2', 'Chile')`);
        await queryRunner.query(`INSERT INTO countries(id, name) VALUES ('3', 'Uruguay')`);
        await queryRunner.query(`INSERT INTO countries(id, name) VALUES ('4', 'Brasil')`);
        await queryRunner.query(`INSERT INTO countries(id, name) VALUES ('5', 'Peru')`);
        await queryRunner.query(`INSERT INTO cities(id, country_id, name) VALUES ('1', '1', 'Buenos Aires')`);
        await queryRunner.query(`INSERT INTO cities(id, country_id, name) VALUES ('2', '1', 'Rosario')`);
        await queryRunner.query(`INSERT INTO cities(id, country_id, name) VALUES ('3', '1', 'Mar del Plata')`);
        await queryRunner.query(`INSERT INTO cities(id, country_id, name) VALUES ('4', '2', 'Santiago')`);
        await queryRunner.query(`INSERT INTO cities(id, country_id, name) VALUES ('5', '3', 'Montevideo')`);
        await queryRunner.query(`INSERT INTO cities(id, country_id, name) VALUES ('6', '4', 'Rio de Janeiro')`);
        await queryRunner.query(`INSERT INTO cities(id, country_id, name) VALUES ('7', '5', 'Lima')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_e025c989126e077b0b8b61a7f3c"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_baebeb388634106e4cbb46192b9"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_4aa0d9a52c36ff93415934e2d2b"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP TABLE "countries"`);
    }

}
