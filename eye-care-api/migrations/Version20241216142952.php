<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241216142952 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_vision_disorder (user_id INT NOT NULL, vision_disorder_id INT NOT NULL, INDEX IDX_243C338BA76ED395 (user_id), INDEX IDX_243C338BFC61CE39 (vision_disorder_id), PRIMARY KEY(user_id, vision_disorder_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_vision_disorder ADD CONSTRAINT FK_243C338BA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_vision_disorder ADD CONSTRAINT FK_243C338BFC61CE39 FOREIGN KEY (vision_disorder_id) REFERENCES vision_disorder (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_vision_disorder DROP FOREIGN KEY FK_243C338BA76ED395');
        $this->addSql('ALTER TABLE user_vision_disorder DROP FOREIGN KEY FK_243C338BFC61CE39');
        $this->addSql('DROP TABLE user_vision_disorder');
    }
}
