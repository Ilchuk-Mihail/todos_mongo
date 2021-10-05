import { expect } from 'chai'
import { after, before, describe } from 'mocha'
import TaskModel from '../model/task'
import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import app from '../app'

const _server = app
axios.defaults.baseURL = 'http://localhost:3000'

const Tasks = {
  _id: '6148502fe5e1d14502694f42',
  description: 'test description',
  title: 'node js learning',
  importance: 'LOW',
  status: 'NOT_STARTED',
  completedAt: null,
  updatedAt: '2021-09-28T14:37:13.659Z',
  createdAt: '2021-09-28T14:37:13.659Z'
}

const validId = Tasks._id
const invalidId = 777
const nonExisted = '6148502fe5e1d14502694f56'

describe('Tasks', () => {
  describe('POST ', () => {
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })
    it('should create a task', async () => {
      const createTask = {
        title: 'title TEST AXIOUS',
        description: 'desc TEST AXIOUS'
      }
      const response = await axios.post('/tasks', createTask)
      expect(response.status).to.equal(201)
      expect(response.data.title).to.equal(createTask.title)
      expect(response.data.description).to.equal(createTask.description)
      expect(response.data.status).to.equal('NOT_STARTED')
      expect(response.data.importance).to.equal('LOW')
    })
    it('should validate request body', async () => {
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
      }
    })
  })
  describe('GET ', () => {
    before('Prepare test data', async () => {
      await TaskModel.create(Tasks)
    })
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })
    it('should get all tasks', async () => {
      const response = await axios.get('/tasks')
      expect(response.status).to.equal(200)
      expect(response.data).to.be.a('object')
    })
  })
  describe('GET by Id', () => {
    before('Prepare test data', async () => {
      await TaskModel.create(Tasks)
    })
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })
    it('should get tasks by id', async () => {
      const response = await axios.get(`/tasks/${validId}`)
      expect(response.status).to.equal(200)
      expect(response.data).to.be.a('object')
    })
    it('should return an error 400 for Invalid Id', async () => {
      try {
        await axios.get(`/tasks/${invalidId}`)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(400)
        expect(data.message).to.equal('Validation error')
      }
    })
    it('should return an error 404 for non-existent Id', async () => {
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
  describe('DELETE by Id', () => {
    before('Prepare test data for', async () => {
      await TaskModel.create(Tasks)
    })
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })
    it('should delete tasks by id', async () => {
      const response = await axios.delete(`/tasks/${validId}`)
      expect(response.status).to.equal(204)
    })
    it('should return an error 404 for non-existent Id', async () => {
      try {
        await axios.delete(`/tasks/${nonExisted}`)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(404)
        expect(data.message).to.equal('Task not found')
      }
    })
    it('should return an error 400 for invalid Id', async () => {
      try {
        await axios.delete(`/tasks/${invalidId}`)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(400)
        expect(data.message).to.equal('Validation error')
      }
    })
  })
  describe('PUT', () => {
    before('Prepare test data for', async () => {
      await TaskModel.create(Tasks)
    })
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })
    it('should replace a task', async () => {
      const UpdateTask = {
        title: 'title TEST AXIOUS',
        description: 'desc TEST AXIOUS',
        status: 'IN_PROGRESS',
        importance: 'HIGH'
      }
      const response = await axios.put(`/tasks/${validId}`, UpdateTask)
      expect(response.status).to.equal(200)
      expect(response.data.title).to.equal(UpdateTask.title)
      expect(response.data.description).to.equal(UpdateTask.description)
      expect(response.data.status).to.equal(UpdateTask.status)
      expect(response.data.importance).to.equal(UpdateTask.importance)
    })
    it('should return an error 400 for Invalid request body', async () => {
      try {
        const UpdateTaskInvalidBody = {
          title: 33,
          description: '',
          status: 'NOT',
          importance: 'HIGHK'
        }
        await axios.put(`/tasks/${validId}`, UpdateTaskInvalidBody)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(400)
        expect(data.message).to.equal('Validation error')
      }
    })
  })
  describe('PATCH ', () => {
    before('Prepare test data for', async () => {
      await TaskModel.create(Tasks)
    })
    after('Delete test data', async () => {
      await TaskModel.deleteMany()
    })
    it('should update a task', async () => {
      const UpdateTask = {
        title: 'title TEST AXIOUS',
        description: 'desc TEST AXIOUS',
        status: 'IN_PROGRESS',
        importance: 'HIGH'
      }
      const response = await axios.patch(`/tasks/${validId}`, UpdateTask)
      expect(response.status).to.equal(200)
      expect(response.data.title).to.equal(UpdateTask.title)
      expect(response.data.description).to.equal(UpdateTask.description)
      expect(response.data.status).to.equal(UpdateTask.status)
      expect(response.data.importance).to.equal(UpdateTask.importance)
    })
    it('should return an error 400 for Invalid request body', async () => {
      try {
        const UpdateTaskInvalidBody = {
          title: 33,
          description: '',
          status: 'NOT',
          importance: 'HIGHK'
        }
        await axios.patch(`/tasks/${validId}`, UpdateTaskInvalidBody)
        expect.fail('call should have failed')
      } catch (err: any) {
        const { response: { status, data } } = err
        expect(status).to.equal(400)
        expect(data.message).to.equal('Validation error')
      }
    })
  })
})

