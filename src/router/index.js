/* eslint-disable semi */
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserIndex from '@/components/user/index'
import DepartmentLeaderIndex from '@/components/departmentLeader/index'
import ProjectLeaderIndex from '@/components/projectLeader/index'
import MasterIndex from '@/components/master/index'
import InputRecordInfo from '@/components/recordProcess/inputRecordInfo'
import Certificate from '@/components/recordProcess/certificate'
import Check from '@/components/recordProcess/check'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/master/index',
      name: 'MasterIndex',
      component: MasterIndex
    },
    {
      path: '/project-leader/index',
      name: 'ProjectLeaderIndex',
      component: ProjectLeaderIndex
    },
    {
      path: '/department-leader/index',
      name: 'DepartmentLeaderIndex',
      component: DepartmentLeaderIndex
    },
    {
      path: '/user/index',
      name: 'UserIndex',
      component: UserIndex
    },
    {
      path: '/record-process/:processInstanceId/input-record-info',
      name: 'InputRecordInfo',
      component: InputRecordInfo
    },
    {
      path: '/record-process/certificate/task/:taskId',
      name: 'Certificate',
      component: Certificate
    },
    {
      path: '/record-process/check/task/:taskId',
      name: 'Check',
      component: Check
    }
  ]
})
