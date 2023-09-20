import { sql, Kysely } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`
      create table Rating(
                             product_id integer not null,
                             rating_stars integer not null,
                             rating_comment text not null,
                             foreign key (product_id) references Product (id)
      )
  `.execute(db)
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`
  
  `.execute(db)
}
