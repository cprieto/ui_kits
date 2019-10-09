import * as React from 'react'
import *  as Yup from 'yup'

import { Formik } from 'formik'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Button, Schema } from 'rsuite'
const { StringType } = Schema.Types

type JobType = "SCHEDULE" | "EMAIL"
type CronType = "UNIX" | "QUARTZ"

interface MyValues {
  name: string
  alias?: string
  jobType: JobType
  cronType: CronType
  schedule: string
}

const schema = Schema.Model({
  name: StringType().isRequired("This field is required"),
  alias: StringType().addRule((value, _) => {
    return /^[A-Za-z][A-Za-z\d_]*$/.test(value)
  }, "It should comply with an alias definition"),
  jobType: StringType().isOneOf(["EMAIL", "SCHEDULE"], "It must be type Email or Schedule"),
  schedule: StringType().isOneOf(["UNIX", "QUARTZ"], "It must be type Email or Schedule"),
})

const Entry = () => (
  <Form model={schema}>
    <FormGroup>
      <ControlLabel>Name</ControlLabel>
      <FormControl name="name" />
    </FormGroup>
    <FormGroup>
      <ControlLabel>Alias</ControlLabel>
      <FormControl name="alias" />
    </FormGroup>
    <FormGroup>
      <ControlLabel>Job Type</ControlLabel>
      <FormControl name="jobType" />
    </FormGroup>
    <FormGroup>
      <ControlLabel>Schedule</ControlLabel>
      <FormControl name="schedule" />
    </FormGroup>
    <FormGroup>
      <ButtonToolbar>
        <Button appearance="primary">Submit</Button>
        <Button appearance="default">Cancel</Button>
      </ButtonToolbar>
    </FormGroup>
  </Form>
)

export default Entry
