class TwallesDsController < ApplicationController
  before_action :set_twalles_d, only: [:show, :edit, :update, :destroy]

  # GET /twalles_ds
  # GET /twalles_ds.json
  def index
    @twalles_ds = TwallesD.all
  end

  # GET /twalles_ds/1
  # GET /twalles_ds/1.json
  def show
  end

  # GET /twalles_ds/new
  def new
    @twalles_d = TwallesD.new
  end

  # GET /twalles_ds/1/edit
  def edit
  end

  # POST /twalles_ds
  # POST /twalles_ds.json
  def create
    @twalles_d = TwallesD.new(twalles_d_params)

    respond_to do |format|
      if @twalles_d.save
        format.html { redirect_to @twalles_d, notice: 'Twalles d was successfully created.' }
        format.json { render :show, status: :created, location: @twalles_d }
      else
        format.html { render :new }
        format.json { render json: @twalles_d.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /twalles_ds/1
  # PATCH/PUT /twalles_ds/1.json
  def update
    respond_to do |format|
      if @twalles_d.update(twalles_d_params)
        format.html { redirect_to @twalles_d, notice: 'Twalles d was successfully updated.' }
        format.json { render :show, status: :ok, location: @twalles_d }
      else
        format.html { render :edit }
        format.json { render json: @twalles_d.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /twalles_ds/1
  # DELETE /twalles_ds/1.json
  def destroy
    @twalles_d.destroy
    respond_to do |format|
      format.html { redirect_to twalles_ds_url, notice: 'Twalles d was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_twalles_d
      @twalles_d = TwallesD.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def twalles_d_params
      params.require(:twalles_d).permit(:idcredito, :idcobrador, :numero_pago, :valor_recaudado, :pago_capital, :pago_interes, :pago_mora, :fecha_pago, :fecgrab, :usergrab, :dias_mora, :estado)
    end
end
