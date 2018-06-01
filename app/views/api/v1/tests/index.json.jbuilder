json.tests @tests.each do |test|
  json.id test.id.to_s
  json.title test.title
  json.description test.description
  json.created_at test.created_at
  json.report_count Record.where(test_id: test.id.to_s)&.size
  json.url "http://31.131.20.79:84/test/#/tests/#{test.id.to_s}"
end
json.count @count
