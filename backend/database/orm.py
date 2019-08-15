import psycopg2
import psycopg2.extras

global host_user_input
host_user_input = "jack"

global password_input
password_input = "password"

global host_input
host_input = "127.0.0.1"

global port_input
port_input = "5432"

global database_input
database_input = "database"

class ORM:
    fields = []
    dbpath = ""
    dbtable = ""
    create = ""

    def __init__(self):
        raise NotImplementedError

    def save(self):
        if self.id is None:
            self._insert()
        else:
            self._update()

    @classmethod
    def _create_insert(cls):
        columnlist = ", ".join(cls.fields)
        placeholder = ", ".join("%s" for val in cls.fields)
        SQL = """ INSERT INTO {tablename} ({columnlist})
        VALUES ({placeholder}) RETURNING id"""
        return SQL.format(tablename=cls.dbtable, columnlist=columnlist, placeholder=placeholder)

    def _insert(self):
        with psycopg2.connect(user = host_user_input, password = password_input, host = host_input,
                              port = port_input, database = database_input) as conn:
            cur = conn.cursor()
            SQL = self._create_insert()
            propvals = [getattr(self, propname) for propname in self.fields]

            cur.execute(SQL, propvals)
            self.id = cur.fetchone()[0]

    @classmethod
    def _create_update(cls):
        """ TODO: IMPLEMENT THIS. Return a generic UPDATE SQL command like
        _create_insert did. You will want to be updating WHERE id = ? """
        # field=?
        update_column_list = ", ".join(field+"=%s" for field in cls.fields)
        SQL = """
UPDATE {tablename} SET {update_column_list} WHERE id=%s; """
        return SQL.format(tablename=cls.dbtable, update_column_list=update_column_list)

    def _update(self):
        with psycopg2.connect(user = host_user_input, password = password_input, host = host_input,
                              port = port_input, database = database_input) as conn:
            cur = conn.cursor()
            SQL = self._create_update()
            propvals = [getattr(self, field) for field in self.fields + ["id"]]
            cur.execute(SQL, propvals)

    @classmethod
    def select_one(cls, SQL, values=tuple()):
        with psycopg2.connect(user = host_user_input, password = password_input, host = host_input,
                              port = port_input, database = database_input) as conn:
            cur = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
            cur.execute(SQL, values)
            row = cur.fetchone()
            if row is None:
                return None
            return cls(**row)

    @classmethod
    def select_all(cls, fromwhere=""):
        SQL = "SELECT * FROM " + fromwhere + ";"
        with psycopg2.connect(user = host_user_input, password = password_input, host = host_input,
                              port = port_input, database = database_input) as conn:
            cur = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
            cur.execute(SQL)
            rows = cur.fetchall()
            return [cls(**row) for row in rows]

    #USE when you need a more specific select_all statement (with inputed values)
    @classmethod
    def select_all_where(cls, SQL, values=tuple()):
        with psycopg2.connect(user = host_user_input, password = password_input, host = host_input,
                              port = port_input, database = database_input) as conn:
            cur = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
            cur.execute(SQL, values)
            rows = cur.fetchall()
            print(rows)
            return [cls(**row) for row in rows]

    #
    # @classmethod
    # def many_where(cls, whereclause="1", values=tuple()):
    #     """ equivalent of one_where but with fetchall, returns a list of objects or an
    #     empty list """
    #     SQL = "SELECT * FROM {tablename} WHERE " + whereclause
    #     with sqlite3.connect(cls.dbpath) as conn:
    #         conn.row_factory = sqlite3.Row
    #         cur = conn.cursor()
    #
    #         cur.execute(SQL.format(tablename=cls.dbtable), values)
    #         rows = cur.fetchall()
    #         return [cls(**row) for row in rows]
    #
    @classmethod
    def from_id(cls, id):
        SQL = "SELECT * FROM {tablename} WHERE id=%s"
        with psycopg2.connect(user = host_user_input, password = password_input, host = host_input,
                              port = port_input, database = database_input) as conn:
            cur = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
            cur.execute(SQL.format(tablename=cls.dbtable), (id,))
            row = cur.fetchone()
            if row is None:
                return None
            return cls(**row)
    #
    # @classmethod
    # def all(cls):
    #     """ return a list of every row in the table as instances of the class """
    #     return cls.many_where()
    #
    def delete(self):
        SQL = "DELETE FROM {tablename} WHERE id=%s"
        with psycopg2.connect(user = host_user_input, password = password_input, host = host_input,
                              port = port_input, database = database_input) as conn:
            cur = conn.cursor()
            cur.execute(SQL.format(tablename=self.dbtable), (self.id,))
            self.id = None
    #
    # def __repr__(self):
    #     reprstring = "<{cname} {fieldvals}>"
    #     # read over this:
    #     fieldvals = " ".join("{key}:{value}".format(key=key, value=getattr(self, key))
    #                          for key in ["id", *self.fields])
    #     cname = type(self).__name__
    #     return reprstring.format(cname=cname, fieldvals=fieldvals)
