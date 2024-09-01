package db

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
    DB, err = sql.Open("sqlite3", "api.db")

	if err != nil {
		panic("Could not connect to database")
	}

	DB.SetMaxOpenConns(9)
	DB.SetMaxIdleConns(4)

	createTables()
}

func createTables() {
    createUsersTable := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	)
	`

	_, err := DB.Exec(createUsersTable)

	if err != nil {
		panic("could not create users table")
	}


    createTasksTable := `
	CREATE TABLE IF NOT EXISTS tasks (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		content TEXT NOT NULL,
		user_id INTEGER,
		FOREIGN KEY(user_id) REFERENCES users(id)
	)
	`
	// FOREIGN KEY(user_id) REFERENCES users(id)


	_, err = DB.Exec(createTasksTable)
    
	if err != nil {
		panic("could not create tasks table")
	}
}

func CheckforEmptyTable(userId int64) {
	// Ensure that the table is not empty
	checkEmptyTable := "SELECT COUNT(*) FROM tasks WHERE user_id = ?"
	var count int
	err := DB.QueryRow(checkEmptyTable, userId).Scan(&count)

	if err != nil {
        panic("could not check tasks table count")
    }

	if count == 0 {
		insertDefaultTask := "INSERT INTO tasks(title, content, user_id) VALUES (?, ?, ?)"
		_, err = DB.Exec(insertDefaultTask, "New Note", "This is your first note", userId)

		if err != nil {
			panic("could not insert default task")
		}
	}
}
