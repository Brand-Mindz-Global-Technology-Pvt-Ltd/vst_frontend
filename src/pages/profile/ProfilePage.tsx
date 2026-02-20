import React, { useState } from 'react';
import { User, MapPin, ShoppingBag, Heart, LogOut, Camera } from 'lucide-react';

// Types for better structure and future API integration
interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface UserProfile {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    avatarUrl: string;
    address: Address;
}

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Personal Info');

    // Mock user data - In future, this would come from an API/Auth context
    const [user, setUser] = useState<UserProfile>({
        fullName: 'VST S',
        email: 'vst@gmail.ac.in',
        phoneNumber: '888888888',
        dateOfBirth: '',
        avatarUrl: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }
    });

    const menuItems = [
        { name: 'Personal Info', icon: <User size={20} /> },
        { name: 'Address Book', icon: <MapPin size={20} /> },
        { name: 'My Orders', icon: <ShoppingBag size={20} /> },
        { name: 'Wishlist', icon: <Heart size={20} /> },
        { name: 'Logout', icon: <LogOut size={20} />, activeColor: 'text-red-600' },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setUser(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof UserProfile] as any),
                    [child]: value
                }
            }));
        } else {
            setUser(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = () => {
        // Logic for saving changes/API call
        console.log('Saved user data:', user);
        alert('Changes saved successfully!');
    };

    return (
        <div className="min-h-screen bg-[#EFEFEF] py-10 px-4 sm:px-10 md:px-20 font-josefin">
            <div className="max-w-[1240px] mx-auto bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
                <div className="flex flex-col lg:flex-row min-h-[600px]">

                    {/* Sidebar */}
                    <aside className="w-full lg:w-[320px] bg-white border-r border-gray-50 p-8 flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full border-[3px] border-[#007ebb] p-1 overflow-hidden flex items-center justify-center bg-gray-50">
                                {user.avatarUrl ? (
                                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <User size={64} className="text-gray-300" />
                                )}
                            </div>
                            <button className="absolute bottom-1 right-1 bg-[#1a1a1a] text-white p-2 rounded-full shadow-lg hover:bg-black transition-colors">
                                <Camera size={14} />
                            </button>
                        </div>

                        <div className="text-center mb-10 w-full px-4 overflow-hidden">
                            <h2 className="text-2xl font-bold font-imperator text-dark break-words">{user.fullName}</h2>
                            <p className="text-sm text-gray-500 mt-1 break-all">{user.email}</p>
                        </div>

                        <nav className="w-full space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => setActiveTab(item.name)}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-left transition-all font-medium ${activeTab === item.name
                                            ? 'bg-[#1a1a1a] text-white shadow-md'
                                            : `text-dark hover:bg-gray-50 ${item.activeColor || ''}`
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 p-8 sm:p-12">
                        {activeTab === 'Personal Info' && (
                            <div className="max-w-3xl">
                                <h1 className="text-3xl font-bold font-imperator text-dark mb-10">Personal Info</h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-500 px-1 uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={user.fullName}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007ebb]/10 focus:border-[#007ebb] transition-all text-dark font-medium"
                                            placeholder="Akash S"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-500 px-1 uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007ebb]/10 focus:border-[#007ebb] transition-all text-dark font-medium"
                                            placeholder="akash@example.com"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-500 px-1 uppercase tracking-wider">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={user.phoneNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007ebb]/10 focus:border-[#007ebb] transition-all text-dark font-medium"
                                            placeholder="6385724960"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 relative">
                                        <label className="text-sm font-semibold text-gray-500 px-1 uppercase tracking-wider">Date of Birth</label>
                                        <input
                                            type="text"
                                            name="dateOfBirth"
                                            value={user.dateOfBirth}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007ebb]/10 focus:border-[#007ebb] transition-all text-dark font-medium"
                                            placeholder="dd - mm - yyyy"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSave}
                                    className="px-10 py-4 bg-[#007ebb] text-white rounded-xl font-bold hover:bg-[#005c8a] shadow-lg shadow-[#007ebb]/20 transition-all active:scale-95"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}

                        {activeTab === 'Address Book' && (
                            <div className="max-w-3xl">
                                <h1 className="text-3xl font-bold font-imperator text-dark mb-10">Address Book</h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-sm font-semibold text-gray-500 px-1 uppercase tracking-wider">Street Address</label>
                                        <input
                                            type="text"
                                            name="address.street"
                                            value={user.address.street}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007ebb]/10 focus:border-[#007ebb] transition-all text-dark font-medium"
                                            placeholder="123 Main St"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-500 px-1 uppercase tracking-wider">City</label>
                                        <input
                                            type="text"
                                            name="address.city"
                                            value={user.address.city}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007ebb]/10 focus:border-[#007ebb] transition-all text-dark font-medium"
                                            placeholder="City"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-500 px-1 uppercase tracking-wider">State / Province</label>
                                        <input
                                            type="text"
                                            name="address.state"
                                            value={user.address.state}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007ebb]/10 focus:border-[#007ebb] transition-all text-dark font-medium"
                                            placeholder="State"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-500 px-1 uppercase tracking-wider">Zip Code</label>
                                        <input
                                            type="text"
                                            name="address.zipCode"
                                            value={user.address.zipCode}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007ebb]/10 focus:border-[#007ebb] transition-all text-dark font-medium"
                                            placeholder="Zip Code"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-gray-500 px-1 uppercase tracking-wider">Country</label>
                                        <input
                                            type="text"
                                            name="address.country"
                                            value={user.address.country}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-[#F8F9FA] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007ebb]/10 focus:border-[#007ebb] transition-all text-dark font-medium"
                                            placeholder="Country"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSave}
                                    className="px-10 py-4 bg-[#007ebb] text-white rounded-xl font-bold hover:bg-[#005c8a] shadow-lg shadow-[#007ebb]/20 transition-all active:scale-95"
                                >
                                    Update Address
                                </button>
                            </div>
                        )}

                        {activeTab !== 'Personal Info' && activeTab !== 'Address Book' && (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-20">
                                <ShoppingBag size={64} strokeWidth={1} className="mb-4 opacity-10" />
                                <h2 className="text-2xl font-bold font-imperator text-dark/30 mb-2 uppercase tracking-widest">{activeTab} section coming soon</h2>
                                <p className="text-sm font-medium">We're working on making this feature available for you.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
