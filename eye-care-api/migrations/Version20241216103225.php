<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241216103225 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_vision_disorder_result (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, vision_disorder_id INT NOT NULL, result INT NOT NULL, INDEX IDX_A9278075A76ED395 (user_id), INDEX IDX_A9278075FC61CE39 (vision_disorder_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vision_disorder (id INT AUTO_INCREMENT NOT NULL, disorder_name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_vision_disorder_result ADD CONSTRAINT FK_A9278075A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_vision_disorder_result ADD CONSTRAINT FK_A9278075FC61CE39 FOREIGN KEY (vision_disorder_id) REFERENCES vision_disorder (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_vision_disorder_result DROP FOREIGN KEY FK_A9278075A76ED395');
        $this->addSql('ALTER TABLE user_vision_disorder_result DROP FOREIGN KEY FK_A9278075FC61CE39');
        $this->addSql('DROP TABLE user_vision_disorder_result');
        $this->addSql('DROP TABLE vision_disorder');
    }
}
