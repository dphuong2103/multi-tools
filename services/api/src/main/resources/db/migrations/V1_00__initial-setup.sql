CREATE TABLE contact_message (
  id varchar(36) default(uuid_to_bin(uuid())),
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  message text NOT NULL,
  ip_address varchar(45) NOT NULL,
  created_at datetime NOT NULL,
  last_modified_at datetime,
  PRIMARY KEY (id),
  INDEX `idx__contact_message__id` (`id`)
);