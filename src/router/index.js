/* eslint-disable semi */
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserIndex from '@/components/user/index'
import DepartmentLeaderIndex from '@/components/departmentLeader/index'
import ProjectLeaderIndex from '@/components/projectLeader/index'
import MasterIndex from '@/components/master/index'
import InputRecordInfo from '@/components/recordProcess/inputRecordInfo'
import FirstCheck from '@/components/recordProcess/firstCheck'
import ProjectLeaderCheck from '@/components/recordProcess/projectLeaderCheck'
import ProjectLeaderConfirm from '@/components/recordProcess/projectLeaderConfirm'
import DepartmentLeaderConfirm from '@/components/recordProcess/departmentLeaderConfirm'
import PaperCheck from '@/components/recordProcess/paperCheck'
import Certificate from '@/components/recordProcess/certificate'

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
      path: '/record-process/first-check/task/:taskId',
      name: 'FirstCheck',
      component: FirstCheck
    },
    {
      path: '/record-process/project-leader-check/task/:taskId',
      name: 'ProjectLeaderCheck',
      component: ProjectLeaderCheck
    },
    {
      path: '/record-process/project-leader-confirm/task/:taskId',
      name: 'ProjectLeaderConfirm',
      component: ProjectLeaderConfirm
    },
    {
      path: '/record-process/department-leader-confirm/task/:taskId',
      name: 'DepartmentLeaderConfirm',
      component: DepartmentLeaderConfirm
    },
    {
      path: '/record-process/paper-check/task/:taskId',
      name: 'PaperCheck',
      component: PaperCheck
    },
    {
      path: '/record-process/certificate/task/:taskId',
      name: 'Certificate',
      component: Certificate
    }
  ]
})
