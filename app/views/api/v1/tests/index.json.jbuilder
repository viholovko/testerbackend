json.tests @tests.each do |test|
  json.id test.id.to_s
  json.title test.title
  json.description test.description
  json.created_at test.created_at
  json.report_count Record.where(test_id: test.id.to_s)&.size
  json.url "http://localhost:3000/test/#/tests/#{test.id.to_s}"
end
json.count @count
