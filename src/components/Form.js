import React, { Component } from 'react'

import { Table, Icon, Button } from 'antd'

import { connect } from 'react-redux'

const columns = [
    {
        title: '公司名称',
        dataIndex: 'companyName',
        key: 'companyName'
    },
    {
        title: '公司 Logo',
        dataIndex: 'companyLogo',
        key: 'companyLogo'
    },
    {
        title: '职位名称',
        dataIndex: 'positionName',
        key: 'positionName'
    },
    {
        title: '职位薪资',
        dataIndex: 'positionSalary',
        key: 'positionSalary'
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button type="primary">编辑</Button>
                <Button type="danger">删除</Button>
            </span>
        )
    }
]

const mapStateToProps = state => {
    return {
        storeList: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadData: () => {
            dispatch(() => {
                fetch('/api/position/m/list')
                    .then(response => response.json())
                    .then(result => {
                        dispatch({
                            type: 'LOAD',
                            list: result.data.map(
                                ({
                                    _id,
                                    companyName,
                                    companyLogo,
                                    positionName,
                                    positionSalary
                                }) => ({
                                    key: _id,
                                    companyName,
                                    companyLogo,
                                    positionName,
                                    positionSalary
                                })
                            )
                        })
                    })
            })
        }
    }
}

class Form extends Component {
    constructor(props) {
        super(props)
    }

    // loadData() {
    //   return (dispatch) => {
    //     fetch('/api/position/m/list')
    //       .then(response => response.json())
    //       .then(result => {
    //         dispatch({
    //           type: 'LOAD',
    //           list: result.data.map(({_id, companyName, companyLogo, positionName, positionSalary}) => ({
    //             key: _id,
    //             companyName,
    //             companyLogo,
    //             positionName,
    //             positionSalary
    //           }))
    //         })
    //       })
    //   }
    // }

    componentDidMount() {
        this.props.loadData()
    }

    render() {
        return (
            <Table
                columns={columns}
                pagination={{
                    defaultPageSize: 5
                }}
                dataSource={this.props.storeList}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
