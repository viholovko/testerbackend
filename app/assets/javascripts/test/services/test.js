import http from './http';

export function all(filters) {
  let url = '/test/tests.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model, test){
  let body = new FormData();

  console.log("-------------------");
  console.log(model);
  console.log("-------------------");
  body.append('test[id]', test.id || '' );
  body.append('test[title]', test.title || '' );
  body.append('test[status]', test.status || false );

  let index = 0;
  if(model){
    for (let key in model) {
      body.append(`answers[${index}][question_id]`, key );
      body.append(`answers[${index}][value]`, model[key] );
      console.log(model[key]);
      index += 1;
    }
  }
  if(model.id){
    console.log('====================');
    return http.put({ url:`test/tests/${model.id}`, body })
  }else{
    console.log('++++++++++++++++++++');
    return http.post({ url:'test/tests', body })
  }
}

export function show(id){
  return http.get({url:`/test/tests/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/test/tests/${id}`})
}
