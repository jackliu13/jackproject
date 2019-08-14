import psycopg2

class Schema:
    def __init__(self):
        self.conn = psycopg2.connect(user = "jack", password = "password", host = "127.0.0.1",
                              port = "5432", database = "database")
        self.cursor = self.conn.cursor()

    def __enter__(self):
        return self

    def __exit__(self, type_, value, traceback):
        if self.conn:
            if self.cursor:
                self.conn.commit()
                self.cursor.close()
            self.conn.close()

    def create_table(self, table_name):
        self.cursor.execute(f'''
			DROP TABLE IF EXISTS {table_name};
			''')
        self.cursor.execute(f'''
			CREATE TABLE {table_name}
			(
			pk INT PRIMARY KEY AUTOINCREMENT NOT NULL
			);
			''')


    def modify_table(self, table_name, column_name, column_type):
        self.cursor.execute(f'''
            ALTER TABLE {table_name}
            ADD COLUMN {column_name} {column_type};
            ''')


# def build_user():
#     Schema().create_table('user_info')
#     Schema().modify_table('user_info', 'username', 'VARCHAR')
#     Schema().modify_table('user_info', 'password', 'VARCHAR')
#     Schema().modify_table('user_info', 'realname', 'VARCHAR')


def build_user():
    with psycopg2.connect(user = "jack", password = "password", host = "127.0.0.1",
                          port = "5432", database = "database") as conn:
        cur = conn.cursor()
        cur.execute('''CREATE EXTENSION IF NOT EXISTS "uuid-ossp";''')
        cur.execute("DROP TABLE IF EXISTS user_info CASCADE;")
        cur.execute('''
            CREATE TABLE user_info(
                id uuid DEFAULT uuid_generate_v4(),
                username VARCHAR UNIQUE NOT NULL,
                password VARCHAR NOT NULL,
                realname VARCHAR NOT NULL,
                PRIMARY KEY (id)
                )''')
# FOREIGN KEY (id) REFERENCES project (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION


def build_project():
    with psycopg2.connect(user = "jack", password = "password", host = "127.0.0.1",
                          port = "5432", database = "database") as conn:
        cur = conn.cursor()
        cur.execute("DROP TABLE IF EXISTS project CASCADE;")
        cur.execute('''
            CREATE TABLE project(
                id uuid DEFAULT uuid_generate_v4(),
                owner uuid NOT NULL,
                title VARCHAR NOT NULL,
                description VARCHAR,
                tags TEXT [],
                PRIMARY KEY (id)
                )''')

def build_user_project():
    with psycopg2.connect(user = "jack", password = "password", host = "127.0.0.1",
                          port = "5432", database = "database") as conn:
        cur = conn.cursor()
        cur.execute("DROP TABLE IF EXISTS user_project CASCADE;")
        cur.execute('''
            CREATE TABLE user_project(
                id uuid DEFAULT uuid_generate_v4(),
                userid uuid,
                projectid uuid,
                userrole TEXT [],
                PRIMARY KEY (id),
                FOREIGN KEY (userId) REFERENCES user_info(id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
                FOREIGN KEY (projectId) REFERENCES project(id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
                )''')

def build_recruit():
    with psycopg2.connect(user = "jack", password = "password", host = "127.0.0.1",
                          port = "5432", database = "database") as conn:
        cur = conn.cursor()
        cur.execute("DROP TABLE IF EXISTS recruit CASCADE;")
        cur.execute('''
            CREATE TABLE recruit(
                id uuid DEFAULT uuid_generate_v4(),
                projectid uuid,
                role VARCHAR NOT NULL,
                description VARCHAR,
                PRIMARY KEY (id),
                FOREIGN KEY (projectId) REFERENCES project(id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
                )''')

def build_recruit_request():
    with psycopg2.connect(user = "jack", password = "password", host = "127.0.0.1",
                          port = "5432", database = "database") as conn:
        cur = conn.cursor()
        cur.execute("DROP TABLE IF EXISTS recruit_request CASCADE;")
        cur.execute('''
            CREATE TABLE recruit_request(
                id uuid DEFAULT uuid_generate_v4(),
                recruitid uuid,
                userid uuid,
                message VARCHAR,
                status VARCHAR NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (userid) REFERENCES user_info(id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
                FOREIGN KEY (recruitid) REFERENCES recruit(id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
                )''')

if __name__ == '__main__':
    build_user()
    build_project()
    build_user_project()
    build_recruit()
    build_recruit_request()
