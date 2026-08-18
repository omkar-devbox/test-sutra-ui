import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  User,
  Paperclip,
  Plus,
  ChevronDown,
  ChevronUp,
  FileText,
  Calculator,
  Upload,
  AlertCircle,
  CheckCircle2,
  X,
  Home,
  Building2,
  ShoppingBag,
  MapPin,
  Send,
  Save,
  Trash2,
  FileCode2,
} from "lucide-react";
import { useOrderForm } from "../hooks/useOrderForm";
import type { Order, ShippingTag } from "../types/orders.types";
import { ordersStyles } from "../style/orders.styles";

interface OrderCreationTerminalProps {
  onOrderCreated?: (order: Order) => void;
  onClose?: () => void;
  existingOrder?: Order | null;
}

export const OrderCreationTerminal: React.FC<OrderCreationTerminalProps> = ({
  onOrderCreated,
  onClose,
  existingOrder,
}) => {
  const [searchParams] = useSearchParams();
  const initialCustomerId = searchParams.get("customerId");
  const navigate = useNavigate();

  const {
    selectedCustomerId,
    setSelectedCustomerId,
    selectedCustomer,
    customers,
    paperTypes,
    items,
    addNewItem,
    removeItem,
    updateItemField,
    attachArtwork,
    shippingInfo,
    setShippingInfo,
    handleAutoFillShipping,
    productionNotes,
    setProductionNotes,
    totalBatchCount,
    totalPayloadSqFt,
    totalValuation,
    submitSuccess,
    draftSaved,
    maxItemsReached,
    maxItems,
    submitOrder,
    saveDraft,
    resetForm,
  } = useOrderForm(initialCustomerId, onOrderCreated, existingOrder);



  // Expanded accordion states for item cards
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    [items[0]?.id || "item-1"]: true,
  });

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

  const handleFileChange = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        setFileSizeError(`File "${file.name}" (${sizeMb} MB) exceeds maximum allowed size of 25 MB.`);
        setTimeout(() => setFileSizeError(null), 4000);
        event.target.value = "";
        return;
      }
      setFileSizeError(null);
      attachArtwork(itemId, file.name);
    } else {
      attachArtwork(itemId);
    }
  };

  const handleCloseTerminal = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/orders");
    }
  };

  const handleFormSubmit = () => {
    submitOrder();
    setTimeout(() => {
      handleCloseTerminal();
    }, 1200);
  };

  return (
    <div className="w-full bg-[#f4f7fa] dark:bg-[#001827] min-h-screen p-3 md:p-6 text-slate-800 dark:text-slate-100">
      {/* Toast Notifications */}
      {fileSizeError && (
        <div className="fixed top-5 right-5 z-50 bg-red-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-shake">
          <AlertCircle size={20} />
          <span className="font-bold text-sm">{fileSizeError}</span>
        </div>
      )}
      {submitSuccess && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 size={20} />
          <span className="font-bold text-sm">Order Submitted Successfully!</span>
        </div>
      )}
      {draftSaved && (
        <div className="fixed top-5 right-5 z-50 bg-amber-500 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3">
          <Save size={20} />
          <span className="font-bold text-sm">Order Saved as Draft!</span>
        </div>
      )}


      {/* Breadcrumb Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={ordersStyles.headerBreadcrumb}>
          <span>ORDERS</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-[#0077be] dark:text-[#38bdf8] font-extrabold">
            Orders Form
          </span>
        </div>

        <button
          onClick={handleCloseTerminal}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          title="Close Orders Form"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Grid: Left Panel (Assign & Items) + Right Panel (Administrative Manifest) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Card 1: ASSIGN TO CUSTOMER */}
          <div className="bg-white dark:bg-[#00253d] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                <User size={15} className="text-slate-400" />
                <span>ASSIGN TO CUSTOMER</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomerId(null)}
                className={ordersStyles.badgeSelfDefault}
                title="Toggle Self / Default Walk-in Customer"
              >
                SELF (DEFAULT)
              </button>
            </div>

            {/* Customer Select Dropdown */}
            <div className="relative">
              <select
                value={selectedCustomerId || ""}
                onChange={(e) => setSelectedCustomerId(e.target.value || null)}
                className="w-full pl-4 pr-10 py-3 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0077be]/40 focus:border-[#0077be] transition-all cursor-pointer"
              >
                <option value="">Select a Customer (Optional)</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.fullName} {c.companyName ? `(${c.companyName})` : ""} — {c.contactNumber}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2.5">
              Assign this order to a specific customer profile. Payments will be tracked against their account.
            </p>
          </div>

          {/* Card 2: ORDER SPECIFICATIONS */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                <Paperclip size={15} className="text-emerald-500" />
                <span>
                  ORDER SPECIFICATIONS ({items.length}/{maxItems})
                </span>
                {maxItemsReached && (
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                    MAX 5 ITEMS REACHED
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={addNewItem}
                disabled={maxItemsReached}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${maxItemsReached
                  ? "bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed opacity-70"
                  : "bg-[#0077be] hover:bg-[#005c94] text-white shadow-md hover:shadow-lg"
                  }`}
                title={maxItemsReached ? "Maximum limit of 5 items per order reached" : "Add new job specification item"}
              >
                <Plus size={16} />
                ADD NEW ITEM
              </button>
            </div>


            {/* Dynamic Job Entry Cards List */}
            {items.map((item, index) => {
              const isExpanded = expandedItems[item.id] !== false;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#00253d] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-sm flex flex-col gap-4 transition-all"
                >
                  {/* Job Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-extrabold text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          JOB ENTRY
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          {item.jobName || "Untitled Project"}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                          title="Remove item entry"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 transition-colors"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Form Inputs */}
                  {isExpanded && (
                    <div className="space-y-4 pt-1">
                      {/* Row 1: Job Name & Media Select */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5">
                            JOB NAME
                          </label>
                          <div className="relative">
                            <FileText
                              size={15}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                              type="text"
                              value={item.jobName}
                              onChange={(e) => updateItemField(item.id, "jobName", e.target.value)}
                              placeholder="e.g. Shop Front Banner"
                              className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0077be]/40 focus:border-[#0077be]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5">
                            SELECT MEDIA / PAPER
                          </label>
                          <div className="relative">
                            <select
                              value={item.mediaId}
                              onChange={(e) => updateItemField(item.id, "mediaId", e.target.value)}
                              className="w-full pl-3.5 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0077be]/40 focus:border-[#0077be] cursor-pointer"
                            >
                              {paperTypes.map((pt) => (
                                <option key={pt.id} value={pt.id}>
                                  {pt.paperTypeName} (₹{pt.pricePerUnit}/{pt.unit})
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              size={16}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Height, Width, Area Calculation, Estimated Cost */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                        {/* Height (FT) */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5">
                            HEIGHT (FT)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={item.heightFt || ""}
                            onChange={(e) => updateItemField(item.id, "heightFt", parseFloat(e.target.value) || 0)}
                            placeholder="0"
                            className={ordersStyles.numberInput}
                          />
                        </div>

                        {/* Width (FT) */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5">
                            WIDTH (FT)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={item.widthFt || ""}
                            onChange={(e) => updateItemField(item.id, "widthFt", parseFloat(e.target.value) || 0)}
                            placeholder="0"
                            className={ordersStyles.numberInput}
                          />
                        </div>

                        {/* Area Calculation */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5">
                            AREA CALCULATION
                          </label>
                          <div className={ordersStyles.calcBoxArea}>
                            <Calculator size={15} className="text-[#0077be]" />
                            <span>{item.areaSqFt} sqft</span>
                          </div>
                        </div>

                        {/* Estimated Cost */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5">
                            ESTIMATED COST
                          </label>
                          <div className={ordersStyles.calcBoxCost}>
                            <span className="font-sans font-bold">$ ₹</span>
                            <span>{item.estimatedCost.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Artwork Attachment & Status Pill */}
                      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dashed border-slate-300 dark:border-slate-600 hover:border-[#0077be] bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all">
                          <Upload size={14} className="text-[#0077be]" />
                          <span>ATTACH ARTWORK (MAX 25MB)</span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(item.id, e)}
                          />
                        </label>


                        {item.artworkAttached ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                            <CheckCircle2 size={13} />
                            <span>{item.artworkFileName || "Artwork Attached"}</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[11px] font-medium border border-slate-200/80 dark:border-slate-700">
                            <AlertCircle size={13} className="text-amber-500" />
                            <span>WAITING FOR CREATIVE ASSET UPLOAD</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (4 Columns): ADMINISTRATIVE MANIFEST */}
        <div className="lg:col-span-4 bg-white dark:bg-[#00253d] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-sm flex flex-col gap-6 sticky top-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              <FileCode2 size={16} className="text-[#0077be]" />
              <span>ADMINISTRATIVE MANIFEST</span>
            </div>
          </div>


          {/* Section 1: SHIPPING INFORMATION */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <MapPin size={13} />
                <span>SHIPPING INFORMATION</span>
              </div>

              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${shippingInfo.status === "COMPLETE"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}
              >
                {shippingInfo.status}
              </span>
            </div>

            {/* Address Form Inputs */}

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  HOUSE NO. / BUILDING NAME
                </label>
                <input
                  type="text"
                  value={shippingInfo.houseNoBuilding}
                  onChange={(e) => setShippingInfo((p) => ({ ...p, houseNoBuilding: e.target.value }))}
                  placeholder="e.g. Flat 101, Springfield Apts"
                  className={ordersStyles.inputField}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  LANDMARK / AREA
                </label>
                <input
                  type="text"
                  value={shippingInfo.landmarkArea}
                  onChange={(e) => setShippingInfo((p) => ({ ...p, landmarkArea: e.target.value }))}
                  placeholder="e.g. Near Central Park"
                  className={ordersStyles.inputField}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    CITY
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo((p) => ({ ...p, city: e.target.value }))}
                    placeholder="City"
                    className={ordersStyles.inputField}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    STATE
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo((p) => ({ ...p, state: e.target.value }))}
                    placeholder="State"
                    className={ordersStyles.inputField}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  PINCODE
                </label>
                <input
                  type="text"
                  value={shippingInfo.pincode}
                  onChange={(e) => setShippingInfo((p) => ({ ...p, pincode: e.target.value }))}
                  placeholder="Pincode"
                  className={ordersStyles.inputField}
                />
              </div>
            </div>
          </div>

          {/* Section 2: PRODUCTION NOTES */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <FileText size={13} />
              <span>PRODUCTION NOTES</span>
            </div>

            <textarea
              rows={3}
              value={productionNotes}
              onChange={(e) => setProductionNotes(e.target.value)}
              placeholder="Enter special instructions for cutting, color matching, or priority deadlines..."
              className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0077be]/40 focus:border-[#0077be]"
            />

            <div className={ordersStyles.productionBadge}>
              <FileText size={13} />
              <span>VISIBLE TO THE DESIGN AND PRODUCTION TEAM</span>
            </div>
          </div>

          {/* Section 3: DARK SUMMARY PAYLOAD CARD */}
          <div className={ordersStyles.darkPayloadCard}>
            <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  BATCH COUNT
                </span>
                <span className="text-xl font-extrabold text-white">
                  {totalBatchCount} Jobs
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  TOTAL PAYLOAD
                </span>
                <span className="text-xl font-extrabold text-white">
                  {totalPayloadSqFt} <span className="text-xs text-slate-400">SQFT</span>
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                TOTAL VALUATION
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#0077be] dark:text-[#38bdf8]">
                  ₹
                </span>
                <span className="text-4xl font-black text-white tracking-tight">
                  {totalValuation.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: ACTION BUTTONS */}
          <div className="space-y-2.5 pt-1">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="w-full py-2.5 px-4 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs tracking-wider transition-all"
              >
                DISCARD
              </button>

              <button
                type="button"
                onClick={saveDraft}
                className="w-full py-2.5 px-4 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 font-bold text-xs tracking-wider transition-all"
              >
                SAVE DRAFT
              </button>
            </div>

            <button
              type="button"
              onClick={handleFormSubmit}
              className="w-full py-3.5 px-6 rounded-full bg-[#0077be] hover:bg-[#005c94] text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Save size={16} />
              SUBMIT ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCreationTerminal;

