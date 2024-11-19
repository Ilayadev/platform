export const routes = [
    {
      name: 'home',
      path: '/',
      component: 'my-home',
      action:(...args:any)=>{
        console.log("called in action",args)
      },
      
    },
    {
      name: 'project',
      path: '/project',
      component: 'my-project',
    //   children: [
    //     {
    //       name: 'projectInformation',
    //       path: '/information',
    //       component: 'my-project-information',
    //     },
    //     {
    //       name: 'projectHostnames',
    //       path: '/hostnames',
    //       component: 'my-project-hostnames',
    //     },
    //   ],
    },
    {
      name: 'organization',
      path: '/organization',
      component: 'my-organization',
    //   children: [
    //     {
    //       name: 'organizationInformation',
    //       path: '/information',
    //       component: 'my-organization-information',
    //       children: [],
    //     },
    //     {
    //       name: 'organizationPayment',
    //       path: '/payment',
    //       component: 'my-organization-payment',
    //       children: [],
    //     },
    //     {
    //       name: 'organizationMembers',
    //       path: '/members',
    //       component: 'my-organization-members',
    //       children: [
    //         {
    //           name: 'organizationMember',
    //           path: '/:id',
    //           component: 'my-organization-member',
    //           children: [],
    //         },
    //       ],
    //     },
    //   ],
    },
  ]