json.reports @record.each do |record|
  json.id record.id.to_s
  json.records record.record
end
json.count @count
