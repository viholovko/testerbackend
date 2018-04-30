import http from './http';

export function all(filters = {}) {
  let url = '/admin/vendor_trades.json?';
  Object.keys(filters).forEach(key => url += `${key}=${filters[key]}&`);
  return http.get({url})
}

export function upsert(model){
  let body = new FormData();

  body.append('vendor_trade[name]', model.name || '' );
  body.append('vendor_trade[email]',  model.email || '' );
  body.append('vendor_trade[phone]', model.phone || '' );
  body.append('vendor_trade[service]', model.service || '' );

  if(model.id){
    return http.put({ url:`/admin/vendor_trades/${model.id}`, body })
  }else{
    return http.post({ url:'/admin/vendor_trades', body })
  }
}

export function show(id){
  return http.get({url:`/admin/vendor_trades/${id}.json`})
}

export function destroy(id){
  return http.delete({url:`/admin/vendor_trades/${id}`})
}
