import { expect } from 'chai'
import { after, before, describe } from 'mocha'
import TaskModel from '../model/task'
import axios from 'axios'

const testTask = {
  _id: '6148502fe5e1d14502694f42',
  description: 'test description',
  title: 'node js learning',
  importance: 'LOW',
  status: 'NOT_STARTED',
  completedAt: null,
  updatedAt: '2021-09-28T14:37:13.659Z',
  createdAt: '2021-09-28T14:37:13.659Z'
}

const validId = testTask._id
const invalidId = 777
const nonExisted = '6148502fe5e1d14502694f56'

describe('Tasks', () => {
  describe('POST /tasks ', () => {
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })

    it('should succeed - create a new task', async () => {
      const createTask = {
        title: 'title TEST AXIOUS',
        description: 'desc TEST AXIOUS'
      }
      const { status, data } = await axios.post('/tasks', createTask)
      expect(status).to.equal(201)
      expect(data.title).to.equal(createTask.title)
      expect(data.description).to.equal(createTask.description)
      expect(data.status).to.equal('NOT_STARTED')
      expect(data.importance).to.equal('LOW')
    })

    it('should fail - invalid request body', async () => {
      try {
        const invalidBodyTask = {
          title: 'title TEST AXIOUS',
          description: 'desc TEST AXIOUS',
          status: 'NOT',
          importance: 'MEDIUMLOW'
        }
        await axios.post('/tasks', invalidBodyTask)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(400)
        expect(data.message).to.equal('Validation error')
        expect(data.validationErrors).to.contain('importance must be a valid enum value')
        expect(data.validationErrors).to.contain('status must be a valid enum value')
      }
    })
  })
  describe('GET /tasks', () => {
    before('Prepare test data', async () => {
      await TaskModel.create(testTask)
    })
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })

    it('should succeed - get all task', async () => {
      const { status, data } = await axios.get('/tasks')
      expect(status).to.equal(200)
      expect(data).to.be.a('object')
    })
  })
  describe('GET /tasks/:id', () => {
    before('Prepare test data', async () => {
      await TaskModel.create(testTask)
    })
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })

    it('should succeed - get task by id', async () => {
      const { status, data } = await axios.get(`/tasks/${validId}`)
      expect(status).to.equal(200)
      expect(data).to.be.a('object')
    })

    it('should fail - invalid id', async () => {
      try {
        await axios.get(`/tasks/${invalidId}`)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(400)
        expect(data.message).to.equal('Validation error')
        expect(data.validationErrors).to.contain('invalid Id')
      }
    })

    it('should fail - non-existent id', async () => {
      try {
        await axios.get(`/tasks/${nonExisted}`)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(404)
        expect(data.message).to.equal('Task not found')
      }
    })
  })
  describe('DELETE /tasks/:id', () => {
    before('Prepare test data for', async () => {
      await TaskModel.create(testTask)
    })
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })

    it('should succeed - delete task by id', async () => {
      const { status } = await axios.delete(`/tasks/${validId}`)
      expect(status).to.equal(204)
    })

    it('should fail - non-existent id', async () => {
      try {
        await axios.delete(`/tasks/${nonExisted}`)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(404)
        expect(data.message).to.equal('Task not found')
      }
    })

    it('should fail - invalid id', async () => {
      try {
        await axios.delete(`/tasks/${invalidId}`)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(400)
        expect(data.message).to.equal('Validation error')
        expect(data.validationErrors).to.contain('invalid Id')
      }
    })
  })
  describe('PUT /tasks/:id', () => {
    before('Prepare test data for', async () => {
      await TaskModel.create(testTask)
    })
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })

    it('should succeed - replace task by id', async () => {
      const updateTask = {
        title: 'title TEST AXIOUS',
        description: 'desc TEST AXIOUS',
        status: 'IN_PROGRESS',
        importance: 'HIGH'
      }
      const { status, data } = await axios.put(`/tasks/${validId}`, updateTask)
      expect(status).to.equal(200)
      expect(data.title).to.equal(updateTask.title)
      expect(data.description).to.equal(updateTask.description)
      expect(data.status).to.equal(updateTask.status)
      expect(data.importance).to.equal(updateTask.importance)
    })

    it('should fail - invalid request body', async () => {
      try {
        const updateTaskInvalidBody = {
          title: 33,
          description: '',
          status: 'NOT',
          importance: 'HIGHK'
        }
        await axios.put(`/tasks/${validId}`, updateTaskInvalidBody)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(400)
        expect(data.message).to.equal('Validation error')
        expect(data.validationErrors).to.contain('title must be a string')
        expect(data.validationErrors).to.contain('description must be longer than or equal to 1 characters')
        expect(data.validationErrors).to.contain('importance must be a valid enum value')
        expect(data.validationErrors).to.contain('status must be a valid enum value')
      }
    })
  })
  describe('PATCH /tasks/:id', () => {
    before('Prepare test data for', async () => {
      await TaskModel.create(testTask)
    })
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })

    it('should succeed - update task by id', async () => {
      const updateTask = {
        title: 'title TEST AXIOUS',
        description: 'desc TEST AXIOUS',
        status: 'IN_PROGRESS',
        importance: 'HIGH'
      }
      const { status, data } = await axios.patch(`/tasks/${validId}`, updateTask)
      expect(status).to.equal(200)
      expect(data.title).to.equal(updateTask.title)
      expect(data.description).to.equal(updateTask.description)
      expect(data.status).to.equal(updateTask.status)
      expect(data.importance).to.equal(updateTask.importance)
    })

    it('should fail - invalid request body', async () => {
      try {
        const updateTaskInvalidBody = {
          title: 33,
          description: '',
          status: 'NOT',
          importance: 'HIGHK'
        }
        await axios.patch(`/tasks/${validId}`, updateTaskInvalidBody)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(400)
        expect(data.message).to.equal('Validation error')
        expect(data.validationErrors).to.contain('title must be a string')
        expect(data.validationErrors).to.contain('description must be longer than or equal to 1 characters')
        expect(data.validationErrors).to.contain('importance must be a valid enum value')
        expect(data.validationErrors).to.contain('status must be a valid enum value')
      }
    })
  })
})
