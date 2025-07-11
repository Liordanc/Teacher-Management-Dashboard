import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Edit,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Plus,
  RefreshCw,
  User,
  Calendar,
} from "lucide-react";
import type { RootState, AppDispatch } from "@/app/src/store/store";
import {
  setEditing,
  updateTeacherData,
  fetchTeacherDetails,
  type TeacherDetails,
} from "@/app/src/store/slices/teacherSlice";

export default function TeacherDetailsForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { details, addresses, isEditing, detailsLoading } = useSelector(
    (state: RootState) => state.teacher
  );
  const [formData, setFormData] = useState<TeacherDetails>(details);

  useEffect(() => {
    setFormData(details);
  }, [details]);

  const handleEdit = () => {
    setFormData(details);
    dispatch(setEditing(true));
  };

  const handleCancel = () => {
    setFormData(details);
    dispatch(setEditing(false));
  };

  const handleSave = () => {
    dispatch(updateTeacherData(formData));
  };

  const handleInputChange = (field: keyof TeacherDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRefreshDetails = () => {
    dispatch(fetchTeacherDetails(details.id || "1"));
  };

  return (
    <>
      {/* Personal Details Section */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Details
              </h3>
              <p className="text-sm text-gray-500">
                Basic information and contact details
              </p>
            </div>
            {detailsLoading && (
              <RefreshCw className="w-5 h-5 animate-spin text-red-600" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefreshDetails}
              disabled={detailsLoading}
              className="btn-secondary"
            >
              <RefreshCw
                className={`w-4 h-4 ${detailsLoading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={detailsLoading}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4" />
                  {detailsLoading ? "Saving..." : "Save"}
                </button>
                <button onClick={handleCancel} className="btn-secondary">
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Cancel</span>
                </button>
              </>
            ) : (
              <button onClick={handleEdit} className="btn-secondary">
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            )}
          </div>
        </div>

        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Basic Information
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={detailsLoading}
                    className="input-field"
                    placeholder="Enter full name"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {details.name || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    disabled={detailsLoading}
                    className="input-field"
                    placeholder="Enter role/position"
                  />
                ) : (
                  <p className="text-gray-900">
                    {details.role || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth Date
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) =>
                      handleInputChange("birthDate", e.target.value)
                    }
                    disabled={detailsLoading}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">
                      {details.birthDate || "Not provided"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Contact Information
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={detailsLoading}
                    className="input-field"
                    placeholder="Enter email address"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-gray-900 break-all">
                      {details.email || "Not provided"}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) =>
                      handleInputChange("workEmail", e.target.value)
                    }
                    disabled={detailsLoading}
                    className="input-field"
                    placeholder="Enter work email"
                  />
                ) : (
                  <p className="text-gray-900 break-all">
                    {details.workEmail || "Not provided"}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="space-y-4 md:col-span-2 xl:col-span-1">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Phone Numbers
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={detailsLoading}
                    className="input-field"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-gray-900">
                      {details.phone || "Not provided"}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.homePhone}
                    onChange={(e) =>
                      handleInputChange("homePhone", e.target.value)
                    }
                    disabled={detailsLoading}
                    className="input-field"
                    placeholder="Enter home phone"
                  />
                ) : (
                  <p className="text-gray-900">
                    {details.homePhone || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Addresses</h3>
              <p className="text-sm text-gray-500">Home and work addresses</p>
            </div>
          </div>
          <button className="btn-secondary">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Address</span>
          </button>
        </div>

        <div className="card-content">
          {addresses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {address.type}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {address.street}
                        <br />
                        {address.city}, {address.state}
                        <br />
                        {address.country}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No addresses added yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
