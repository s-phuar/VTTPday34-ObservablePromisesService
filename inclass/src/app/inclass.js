

  //promise is good for having an order to dependent statements
  //like a large if else tree

  let p = new Promise(
    (resolve, reject) => {
      //resolve and reject are both functions
      //they are the outcomes when you perform your task. If successful, call resolve else reject
      //sleep timer
      setTimeout(() => { //performs below 3(2 due to below comment) lines after 5 seconds
        console.info('COMPLETED')
        resolve('task is successful') //cannot un-resolve and reject task and vice versa
        reject('task has failed')
      }, 5000)
    })

    //resolve calls this function on success
    p
    .then(resultXDXD =>{
      console.info('>>> promise resolved: ', resultXDXD) //result is 'task is succesful'
      return 'this is another reults' //whatever you return in then block becomes a promise
    })
    .then(resultXDXD =>{
      console.info('second promise: ', resultXDXD)
        //throw 'this is an error from the 2nd promise'
          //jumps straight to catch block, if there nos catch block node.js handles it with its own exception

      return 123
    }).then(resultXDXD =>{
      console.info('third promise value: ', resultXDXD)
    })
    .catch(errorXDXD =>{console.info('>>> promise has failed: ', errorXDXD)})

    console.info('>>> p =', p)
