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
    createTasksTable := `
	CREATE TABLE IF NOT EXISTS tasks (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL UNIQUE,
		content TEXT NOT NULL
	)
	`
	// FOREIGN KEY(user_id) REFERENCES users(id)


	_, err := DB.Exec(createTasksTable)
    
	if err != nil {
		panic("could not create tasks table")
	}
}

func CheckforEmptyTable() {
	// Ensure that the table is not empty
	checkEmptyTable := "SELECT COUNT(*) FROM tasks"
	var count int
	err := DB.QueryRow(checkEmptyTable).Scan(&count)

	if err != nil {
        panic("could not check tasks table count")
    }

	if count == 0 {
		insertDefaultTask := "INSERT INTO tasks(title, content) VALUES (?, ?)"
		_, err = DB.Exec(insertDefaultTask, "New Note", "This is your first note ")

		if err != nil {
			panic("could not insert default task")
		}
	}
}
