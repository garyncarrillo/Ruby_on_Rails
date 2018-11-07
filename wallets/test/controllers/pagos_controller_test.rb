require 'test_helper'

class PagosControllerTest < ActionDispatch::IntegrationTest
  test "should get show_cobrador" do
    get pagos_show_cobrador_url
    assert_response :success
  end

end
