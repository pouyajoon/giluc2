json.array!(@gifts) do |gift|
  json.extract! gift, :id, :title, :q_expected, :q_have, :who, :whoemail
  json.url gift_url(gift, format: :json)
end
