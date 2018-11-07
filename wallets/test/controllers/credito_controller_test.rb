require 'test_helper'

class CreditoControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get credito_show_url
    assert_response :success
  end

end
