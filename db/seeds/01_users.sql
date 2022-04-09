-- Users table seeds here (Example)
INSERT INTO users (name, email, password)
VALUES
('Alice Garry', 'test@test.com', 'test1234'),
('Dan Garry', 'test1@test.com', 'test1234'),
('Pete Garry', 'test2@test.com', 'test1234'),
('Marvin Garry', 'test3@test.com', 'test1234'),
('Kelly Garry', 'test4@test.com', 'test1234');

INSERT INTO stories (owner_id, content)
VALUES
('1', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident pariatur ullam architecto iusto, eos unde ipsum sit aspernatur numquam voluptas.'),
('1', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit eaque quis repellendus atque mollitia, debitis harum nemo fuga et facere ipsam temporibus non obcaecati aliquam asperiores assumenda quod architecto alias eum velit? Error maxime fuga dolore eos sunt temporibus magnam in earum, dolores, ea aspernatur ipsum unde dicta, distinctio nulla.'),
('1', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui culpa perferendis fugit expedita iure. Eligendi ipsa possimus quibusdam sit saepe reiciendis unde animi tempore, facere eos fugiat asperiores nihil cumque vel tempora voluptatem quia ullam provident. Cum in accusantium magni?'),
('2', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident pariatur ullam architecto iusto, eos unde ipsum sit aspernatur numquam voluptas.'),
('2', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident pariatur ullam architecto iusto, eos unde ipsum sit aspernatur numquam voluptas.'),
('3', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident pariatur ullam architecto iusto, eos unde ipsum sit aspernatur numquam voluptas.');

INSERT INTO contributions (user_id, story_id, content)
VALUES
(1, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, reprehenderit?'),
(1, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, temporibus?'),
(1, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, reprehenderit?'),
(1, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, reprehenderit?'),
(2, 2, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, reprehenderit?'),
(2, 2, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, reprehenderit?'),
(3, 2, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, reprehenderit?');

INSERT INTO upvotes (contribution_id, user_id)
VALUES
(1, 1),
(2, 2),
(7, 1),
(3, 4),
(5, 5),
(4, 1),
(6, 2);
