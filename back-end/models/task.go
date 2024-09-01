package models

import (
	"fmt"

	"example.com/back-end/db"
)

type Task struct {
	ID      int64
	Title   string
	Content string
	UserID  int64
}


func (task *Task) Save() error {
    query := `INSERT INTO tasks(title, content, user_id) 
	VALUES (?, ?, ?)`
    
	stmt, err := db.DB.Prepare(query)

    if err != nil {
		return err
	}
	defer stmt.Close()

	fmt.Println("User_id inserted : ", task.UserID)

	res, err := stmt.Exec(task.Title, task.Content, task.UserID)

	if err != nil {
		return err
	}

	id, err := res.LastInsertId()
	task.ID = id

	return err
}

func GetTasksByUserID(userID int64) ([]Task, error) {
	query := "SELECT * FROM tasks WHERE user_id = ?"

	rows, err := db.DB.Query(query, userID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var tasks []Task

	for rows.Next() {
		var task Task

		err := rows.Scan(&task.ID, &task.Title, &task.Content, &task.UserID)

		if err != nil {
			return nil, err
		}

		tasks = append(tasks, task)
	}

	return tasks, nil	
}

func GetTaskByID(id int64) (*Task, error) {
	query := "SELECT * FROM tasks WHERE id = ?"
	row := db.DB.QueryRow(query, id)

	var task Task 
	err := row.Scan(&task.ID, &task.Title, &task.Content, &task.UserID)
	
	if err != nil {
		return nil, err
	}

	return &task, nil
}

func (task Task) Delete() error {
	fmt.Println("Delete task called")
    query := "DELETE FROM tasks WHERE id = ?"

	stmt, err := db.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(task.ID)
	return err
}

func (task Task) Update() error {
	query := `
	UPDATE tasks 
	SET title = ?, content = ?
	WHERE id = ?
	`

	stmt, err := db.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(task.Title, task.Content, task.ID)

	return err
}