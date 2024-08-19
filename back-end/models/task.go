package models

import "example.com/back-end/db"

type Task struct {
	ID int64
	Title string
	Content string
}


func (task *Task) Save() error {
    query := `INSERT INTO tasks(title, content) 
	VALUES (?, ?)`

	stmt, err := db.DB.Prepare(query)

    if err != nil {
		return err
	}
	defer stmt.Close()

	res, err := stmt.Exec(task.Title, task.Content)

	if err != nil {
		return err
	}

	id, err := res.LastInsertId()
	task.ID = id

	return err
}

func GetallTasks() ([]Task, error) {
	query := "SELECT * FROM tasks"

	rows, err := db.DB.Query(query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var tasks []Task

	for rows.Next() {
		var task Task

		err := rows.Scan(&task.ID, &task.Title, &task.Content)

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
	err := row.Scan(&task.ID, &task.Title, &task.Content)
	
	if err != nil {
		return nil, err
	}

	return &task, nil
}

func (task Task) Delete() error {
    query := "DELETE FROM tasks WHERE id = ?"

	stmt, err := db.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(task.ID)
	return err
}