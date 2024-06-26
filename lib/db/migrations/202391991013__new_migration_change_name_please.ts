import { sql, Kysely } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`
      create table product(
                              id          integer primary key autoincrement,
                              category integer not null,
                              name        text    not null,
                              description text    not null,
                              price       integer  not null,
                              amount      integer not null,
                              dateAddded  timestamp default current_timestamp
      )

  `.execute(db)
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`
  
  `.execute(db)
}
