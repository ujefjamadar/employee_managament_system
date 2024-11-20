const db = require('../Utilities/dbConfig');


exports.get = (req, res) => {
    var pageIndex = req.body.pageIndex ? req.body.pageIndex : '';

    var pageSize = req.body.pageSize ? req.body.pageSize : '';
    var start = 0;
    var end = 0;

    console.log(pageIndex + " " + pageSize)
    if (pageIndex != '' && pageSize != '') {
        start = (pageIndex - 1) * pageSize;
        end = pageSize;
        console.log(start + " " + end);
    }

    let sortKey = req.body.sortKey ? req.body.sortKey : 'ID';
    let sortValue = req.body.sortValue ? req.body.sortValue : 'DESC';
    let filter = req.body.filter ? req.body.filter : '';

    let criteria = '';

    if (pageIndex === '' && pageSize === '')
        criteria = filter + " order by " + sortKey + " " + sortValue;
    else
        criteria = filter + " order by " + sortKey + " " + sortValue + " LIMIT " + start + "," + end;

    let countCriteria = filter;
    db.query('select count(*) as cnt from employee_master where 1 ' + countCriteria, (err, results1) => {
        if (err) {
            console.log('Error fetching employees count:', err);
            res.status(500).send({ message: 'Failed to get employee_master count' });
        } else {
            db.query('select * from employee_master where 1 ' + criteria, (err, result) => {
                if (err) {
                    console.log('Error fetching employees information:', err);
                    res.status(500).send({ message: ' "Failed to get employee_master information."' });
                }
                else {
                    res.send({
                        "code": 200,
                        "message": "success",
                        "count": results1[0].cnt,
                        "data": result
                    });
                }
            })

        }
    });
}

exports.get1 = (req, res) => {
    var pageIndex = req.body.pageIndex ? req.body.pageIndex : '';

    var pageSize = req.body.pageSize ? req.body.pageSize : '';
    var start = 0;
    var end = 0;

    console.log(pageIndex + " " + pageSize)
    if (pageIndex != '' && pageSize != '') {
        start = (pageIndex - 1) * pageSize;
        end = pageSize;
        console.log(start + " " + end);
    }

    let sortKey = req.body.sortKey ? req.body.sortKey : 'ID';
    let sortValue = req.body.sortValue ? req.body.sortValue : 'DESC';
    let filter = req.body.filter ? req.body.filter : '';

    let criteria = '';

    if (pageIndex === '' && pageSize === '')
        criteria = filter + " order by " + sortKey + " " + sortValue;
    else
        criteria = filter + " order by " + sortKey + " " + sortValue + " LIMIT " + start + "," + end;

    let countCriteria = filter;
    db.query('select distinct branch_name from employee_master where 1 ' + countCriteria, (err, results1) => {
        if (err) {
            console.log('Error fetching employees count:', err);
            res.status(500).send({ message: 'Failed to get distinct branch_name' });
        } else {
            db.query('select distinct dept_name from employee_master where 1 ' + criteria, (err, result) => {
                if (err) {
                    console.log('Error fetching employees information:', err);
                    res.status(500).send({ message: 'Failed to get distinct dept_name' });
                }
                else {
                    res.send({
                        "code": 200,
                        "message": "success",
                        "count": results1[0].cnt,
                        "data": result
                    });
                }
            })

        }
    });
}

exports.create = (req, res) => {
    const { name, designation, gender, mob_no, email_id, DOB, status, DOJ, branch_name, dept_name, office_name } = req.body;

    if (name && email_id && mob_no && branch_name) {
        const sql = 'INSERT INTO employee_master (name,designation,gender,mob_no,email_id,DOB,status,DOJ,branch_name,dept_name,office_name) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?)';

        db.query(sql, [name, designation, gender, mob_no, email_id, DOB, status, DOJ, branch_name, dept_name, office_name], (err, results) => {

            if (err) {
                console.log('Error inserting employee:', err);
                res.status(500).send({
                    message: 'Error inserting employee'
                });
            } else {
                res.status(201).send({
                    message: 'Employee created successfully',
                    results,
                    row: results.affectedRows
                });
            }
        }
        )
    } else {
        res.status(201).send({
            message: "please provide credintials"
        })

    }
};


exports.updateById = (req, res) => {
    const { id } = req.params;
    const { name, designation, gender, mob_no, email_id, DOB, status, DOJ, branch_name, dept_name, office_name } = req.body;

    if (id && name && designation && mob_no && dept_name) {
        const sql = `UPDATE employee_master SET name = ?, designation = ?, gender = ?, mob_no = ?, email_id = ?, DOB = ?, status = ?, DOJ = ?, branch_name = ?, dept_name = ?, office_name = ? WHERE id = ?`;

        db.query(sql, [name, designation, gender, mob_no, email_id, DOB, status, DOJ, branch_name, dept_name, office_name, id], (err, results) => {
            if (err) {
                console.error('Error updating employee:', err);
                res.status(500).send({
                    message: 'Error updating employee'
                });
            }
            else if (results.affectedRows === 0) {
                res.status(404).send({
                    message: 'Employee not found'
                });
            } else {
                res.status(200).send({
                    message: 'Employee updated successfully'
                });
            }
        });
    } else {
        res.status(400).send({
            message: "Please provide all required fields"
        })
    }
};



exports.update = (req, res) => {
    console.log(req.body);

    const data = {
        id: req.body.id,
        name: req.body.name,
        designation: req.body.designation,
        gender: req.body.gender,
        mob_no: req.body.mob_no,
        email_id: req.body.email_id,
        DOB: req.body.DOB,
        status: req.body.status === false ? 0 : req.body.status,
        DOJ: req.body.DOJ,
        branch_name: req.body.branch_name,
        dept_name: req.body.dept_name,
        office_name: req.body.office_name
    };

    if (!data.id) {
        return res.status(400).send({
            code: 400,
            message: "ID is required for updating the employee record."
        });
    }

    let setData = "";
    let recordData = [];

    Object.keys(data).forEach(key => {
        if (data[key] !== undefined && key !== 'id') {
            setData += `${key} = ?, `;
            recordData.push(data[key]);
        }
    });

    setData = setData.slice(0, -2);     

    if (!setData) {
        return res.status(400).send({
            code: 400,
            message: "No valid fields provided for update."
        });
    }

    try {
        console.log("recordData", recordData);

        db.query(`UPDATE employee_master SET ${setData} WHERE id = ?`, [...recordData, data.id], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({
                    code: 400,
                    message: "Failed to update employee master information."
                });
            }

            console.log(results);
            res.send({
                code: 200,
                message: "Employee master information updated successfully.",
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: "An error occurred during the update operation.",
        });
    }
};


