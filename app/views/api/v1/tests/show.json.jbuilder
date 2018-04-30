json.id @test.id.to_s
json.title @test.title
json.created_at @test.created_at.try :strftime, '%d %b %Y at %H:%M'