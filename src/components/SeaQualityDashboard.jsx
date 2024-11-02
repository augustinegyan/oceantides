// src/components/SeaQualityDashboard.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Droplet, 
  Thermometer, 
  Wind, 
  Clock, 
  AlertTriangle, 
  Sun, 
  Moon,
  BarChart3,
  Settings,
  Bell,
  Home,
  Map,
  Waves,
  Menu,
  ChevronLeft,
  Users
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';

const SidebarItem = ({ icon: Icon, label, active, collapsed }) => (
  <div className={`
    flex items-center px-3 py-2 rounded-lg cursor-pointer
    ${active ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'}
    transition-colors duration-200
    ${collapsed ? 'justify-center' : 'space-x-3'}
  `}>
    <Icon className="h-5 w-5" />
    {!collapsed && <span>{label}</span>}
  </div>
);

const SeaQualityDashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Sample data - in a real app, this would come from your API
  const [data] = useState([
    { time: '00:00', temperature: 18.2, salinity: 35.1, oxygen: 7.2, turbidity: 2.1, pH: 8.1 },
    { time: '04:00', temperature: 18.0, salinity: 35.2, oxygen: 7.1, turbidity: 2.3, pH: 8.0 },
    { time: '08:00', temperature: 18.5, salinity: 35.0, oxygen: 7.3, turbidity: 2.0, pH: 8.2 },
    { time: '12:00', temperature: 19.1, salinity: 34.9, oxygen: 7.4, turbidity: 1.9, pH: 8.1 },
    { time: '16:00', temperature: 19.3, salinity: 34.8, oxygen: 7.2, turbidity: 2.2, pH: 8.0 },
    { time: '20:00', temperature: 18.8, salinity: 35.0, oxygen: 7.1, turbidity: 2.4, pH: 8.1 },
  ]);

  const getStatusColor = (value, type) => {
    const thresholds = {
      temperature: { low: 16, high: 22 },
      salinity: { low: 34, high: 36 },
      oxygen: { low: 6, high: 8 },
      turbidity: { low: 0, high: 3 },
      pH: { low: 7.8, high: 8.4 }
    };

    if (value < thresholds[type].low) return 'text-yellow-500';
    if (value > thresholds[type].high) return 'text-red-500';
    return 'text-green-500';
  };

  const currentReadings = data[data.length - 1];

  // Theme-aware styles
  const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = isDark ? 'text-gray-100' : 'text-gray-900';
  const subTextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const chartGridColor = isDark ? '#333' : '#ddd';
  const sidebarBg = isDark ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`
        ${sidebarBg} ${borderColor}
        border-r transition-all duration-300
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className={`
            p-4 flex items-center
            ${sidebarCollapsed ? 'justify-center' : 'justify-between'}
            ${borderColor} border-b
          `}>
            {!sidebarCollapsed && (
              <span className={`font-bold text-lg ${textColor}`}>OceanTides</span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronLeft /> : <Menu />}
            </Button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-3 space-y-2">
            <SidebarItem icon={Home} label="Overview" active collapsed={sidebarCollapsed} />
            <SidebarItem icon={Waves} label="Buoy Network" collapsed={sidebarCollapsed} />
            <SidebarItem icon={Map} label="Map View" collapsed={sidebarCollapsed} />
            <SidebarItem icon={BarChart3} label="Analytics" collapsed={sidebarCollapsed} />
            <SidebarItem icon={Bell} label="Alerts" collapsed={sidebarCollapsed} />
            <SidebarItem icon={Users} label="Team" collapsed={sidebarCollapsed} />
          </nav>

          {/* Sidebar Footer */}
          <div className={`
            p-4 ${borderColor} border-t
            ${sidebarCollapsed ? 'justify-center' : 'justify-between'}
            flex items-center
          `}>
            {!sidebarCollapsed && (
              <span className={subTextColor}>v1.0.0</span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 overflow-auto ${bgColor} transition-colors duration-200`}>
        {/* Header */}
        <div className={`p-6 ${borderColor} border-b flex justify-between items-center`}>
          <div className="flex items-center space-x-4">
            <h1 className={`text-2xl font-bold ${textColor}`}>Dashboard Overview</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className={`h-5 w-5 ${subTextColor}`} />
            <span className={subTextColor}>Last updated: {currentReadings.time}</span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${subTextColor}`}>Temperature</p>
                    <p className={`text-2xl font-bold ${getStatusColor(currentReadings.temperature, 'temperature')}`}>
                      {currentReadings.temperature}°C
                    </p>
                  </div>
                  <Thermometer className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${subTextColor}`}>Salinity</p>
                    <p className={`text-2xl font-bold ${getStatusColor(currentReadings.salinity, 'salinity')}`}>
                      {currentReadings.salinity} PSU
                    </p>
                  </div>
                  <Droplet className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${subTextColor}`}>Dissolved Oxygen</p>
                    <p className={`text-2xl font-bold ${getStatusColor(currentReadings.oxygen, 'oxygen')}`}>
                      {currentReadings.oxygen} mg/L
                    </p>
                  </div>
                  <Wind className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${subTextColor}`}>Turbidity</p>
                    <p className={`text-2xl font-bold ${getStatusColor(currentReadings.turbidity, 'turbidity')}`}>
                      {currentReadings.turbidity} NTU
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${subTextColor}`}>pH Level</p>
                    <p className={`text-2xl font-bold ${getStatusColor(currentReadings.pH, 'pH')}`}>
                      {currentReadings.pH}
                    </p>
                  </div>
                  <Droplet className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Section */}
          {currentReadings.turbidity > 2.2 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>High Turbidity Warning</AlertTitle>
              <AlertDescription>
                Current turbidity levels are above normal. This may indicate increased sediment or algal presence.
              </AlertDescription>
            </Alert>
          )}

          {/* Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className={textColor}>Temperature & Salinity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                      <XAxis 
                        dataKey="time" 
                        stroke={isDark ? '#888' : '#666'}
                      />
                      <YAxis 
                        yAxisId="left" 
                        stroke={isDark ? '#888' : '#666'}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        stroke={isDark ? '#888' : '#666'}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: isDark ? '#1f2937' : '#fff',
                          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                          color: isDark ? '#fff' : '#000'
                        }}
                      />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#2196F3" 
                        name="Temperature (°C)"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="salinity" 
                        stroke="#4CAF50" 
                        name="Salinity (PSU)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={textColor}>Oxygen & pH Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                      <XAxis 
                        dataKey="time" 
                        stroke={isDark ? '#888' : '#666'}
                      />
                      <YAxis 
                        yAxisId="left" 
                        stroke={isDark ? '#888' : '#666'}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        stroke={isDark ? '#888' : '#666'}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: isDark ? '#1f2937' : '#fff',
                          border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                          color: isDark ? '#fff' : '#000'
                        }}
                      />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="oxygen" 
                        stroke="#FF9800" 
                        name="Dissolved Oxygen (mg/L)"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="pH" 
                        stroke="#9C27B0" 
                        name="pH Level"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeaQualityDashboard;