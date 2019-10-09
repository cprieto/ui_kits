import * as React from 'react'
import { Table, Icon } from 'rsuite'

const items = [
  {id: 1, name: "Cristian"},
  {id: 2, name: "Jodie"},
  {id: 3, name: "Eys"},
]

const List = () => (
  <Table data={items}>
    <Table.Column>
      <Table.HeaderCell>ID</Table.HeaderCell>
      <Table.Cell dataKey="id"/>
    </Table.Column>
    <Table.Column>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.Cell dataKey="name"/>
    </Table.Column>
    <Table.Column>
      <Table.HeaderCell>Type</Table.HeaderCell>
      <Table.Cell>
        <Icon icon="calendar" />
      </Table.Cell>
    </Table.Column>
  </Table>
)

export default List
