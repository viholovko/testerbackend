import http from './http';

export function all(filters = {}) {
  let url = '/admin/numbers.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('number[number]', model.number || '' );
  // body.append('number[status]',  model.status || '' );
  // body.append('number[details]', model.details || '' );

  if(model.id){
    return http.put({ url:`/admin/numbers/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/numbers', body })
  }
}

export function show(id){
  return http.get({url:`/admin/numbers/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/numbers/${id}`})
}
