'use client';

import { 
  TextField, 
  InputGroup, 
  Label, 
  Select, 
  ListBox 
} from '@heroui/react';
import { Magnifier, ChevronDown } from '@gravity-ui/icons';

export default function JobFilter({ 
  searchQuery, 
  setSearchQuery, 
  categoryFilter, 
  setCategoryFilter, 
  typeFilter, 
  setTypeFilter, 
  remoteFilter, 
  setRemoteFilter 
}) {
  return (
    <div className="bg-[#12141d] p-4 rounded-2xl border border-white/10 space-y-4 mb-8">
      {/* Search Input Field */}
      <TextField className="w-full">
        <Label className="text-xs text-zinc-400 mb-1.5 block">Search Jobs</Label>
        <InputGroup className="bg-[#1e202c] border border-white/5 rounded-xl text-white px-3 py-1 flex items-center focus-within:border-pink-500/50">
          <InputGroup.Prefix className="text-zinc-400 mr-2 flex items-center">
            <Magnifier className="w-4 h-4" />
          </InputGroup.Prefix>
          <InputGroup.Input
            type="text"
            placeholder="Search by job title, company, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white placeholder-zinc-500 w-full"
          />
        </InputGroup>
      </TextField>

      {/* Select Dropdown Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Category Filter */}
        <Select 
          value={categoryFilter} 
          onChange={(val) => setCategoryFilter(val)} 
          className="w-full"
        >
          <Label className="text-xs text-zinc-400 mb-1.5 block">Category</Label>
          <Select.Trigger className="bg-[#1e202c] border border-white/5 rounded-xl px-3 py-2 text-sm text-white flex justify-between items-center w-full">
            <Select.Value placeholder="All Categories" />
            <Select.Indicator>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#181a24] border border-white/10 rounded-xl p-1 shadow-2xl z-50">
            <ListBox className="text-sm text-zinc-300">
              <ListBox.Item id="all" className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Label>All Categories</Label>
              </ListBox.Item>
              <ListBox.Item id="data-science" className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Label>Data Science</Label>
              </ListBox.Item>
              <ListBox.Item id="engineering" className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Label>Engineering</Label>
              </ListBox.Item>
              <ListBox.Item id="design" className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Label>Design</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Job Type Filter */}
        <Select 
          value={typeFilter} 
          onChange={(val) => setTypeFilter(val)} 
          className="w-full"
        >
          <Label className="text-xs text-zinc-400 mb-1.5 block">Job Type</Label>
          <Select.Trigger className="bg-[#1e202c] border border-white/5 rounded-xl px-3 py-2 text-sm text-white flex justify-between items-center w-full">
            <Select.Value placeholder="All Types" />
            <Select.Indicator>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#181a24] border border-white/10 rounded-xl p-1 shadow-2xl z-50">
            <ListBox className="text-sm text-zinc-300">
              <ListBox.Item id="all" className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Label>All Types</Label>
              </ListBox.Item>
              <ListBox.Item id="full-time" className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Label>Full-Time</Label>
              </ListBox.Item>
              <ListBox.Item id="part-time" className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Label>Part-Time</Label>
              </ListBox.Item>
              <ListBox.Item id="contract" className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Label>Contract</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Remote/Location Filter */}
        <Select 
          value={remoteFilter} 
          onChange={(val) => setRemoteFilter(val)} 
          className="w-full"
        >
          <Label className="text-xs text-zinc-400 mb-1.5 block">Workplace</Label>
          <Select.Trigger className="bg-[#1e202c] border border-white/5 rounded-xl px-3 py-2 text-sm text-white flex justify-between items-center w-full">
            <Select.Value placeholder="All Locations" />
            <Select.Indicator>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#181a24] border border-white/10 rounded-xl p-1 shadow-2xl z-50">
            <ListBox className="text-sm text-zinc-300">
              <ListBox.Item id="all" className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Label>All Workplaces</Label>
              </ListBox.Item>
              <ListBox.Item id="remote" className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Label>Remote Only</Label>
              </ListBox.Item>
              <ListBox.Item id="onsite" className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                <Label>On-Site Only</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}