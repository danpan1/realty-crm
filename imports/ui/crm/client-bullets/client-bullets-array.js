export const bullets = [{
      name: 'Эконом 1-комнатные',
      roomCount: 1,
      priceRange: '30000 - 50000',
      filter: {
        roomcount: [{id:1,name:'1'}],
        priceFrom: 30000,
        priceTo: 50000,
        subways: [],
        districts: []
      },
      needMeeting: false,
      needComission: false,
      dealSpeed: 0
    },{
      name: 'Эконом 2-комнатные',
      roomCount: 2,
      priceRange: '45000 - 65000',
      filter: {
        roomcount: [{id:2,name:'2'}],
        priceFrom: 45000,
        priceTo: 65000,
        subways: [],
        districts: []
      },
      bullet:{
        needMeeting: false,
        needComission: false,
        dealSpeed: 0
      }
    },{
      name: 'Эконом 3-комнатные',
      roomCount: 3,
      priceRange: '65000 - 90000',
      filter: {
        roomcount: [{id:3,name:'3'}],
        priceFrom: 65000,
        priceTo: 90000,
        subways: [],
        districts: []
      },
      needMeeting: false,
      needComission: false,
      dealSpeed: 0
    }
]