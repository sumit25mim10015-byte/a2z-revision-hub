import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// TOPIC DATA
// ════════════════════════════════════════════════════════════════════════════

const TOPIC_SORTING = {
    stepId: "step2", stepTitle: "Step 2: Sorting Techniques", color: "#06B6D4",
    subtopics: [
      { id: "2.1", title: "Sorting I", problems: [
        { id:31, name:"Selection Sort",                          difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3ppA6YJ", yt:"https://youtu.be/HGk_ypEuS24?t=166" },
        { id:32, name:"Bubble Sort",                             difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3w6yQx8", yt:"https://youtu.be/HGk_ypEuS24?t=1061" },
        { id:33, name:"Insertion Sort",                          difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3JVcqot", yt:"https://youtu.be/HGk_ypEuS24?t=1901" },
      ]},
      { id: "2.2", title: "Sorting II", problems: [
        { id:34, name:"Merge Sort",                              difficulty:"Medium", lc:null, gfg:"https://bit.ly/3A30Anw", yt:"https://youtu.be/ogjf7ORKfd8" },
        { id:35, name:"Recursive Bubble Sort",                   difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3QV65vI", yt:null },
        { id:36, name:"Recursive Insertion Sort",                difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3PxAWx1", yt:null },
        { id:37, name:"Quick Sort",                              difficulty:"Medium", lc:null, gfg:"https://bit.ly/3dsEbIK", yt:"https://youtu.be/WIrA4YexLRQ" },
      ]},
    ]
};

const TOPIC_ARRAYS = {
    stepId: "step3", stepTitle: "Step 3: Arrays", color: "#10B981",
    subtopics: [
      { id: "3.1", title: "Arrays — Easy", problems: [
        { id:38, name:"Largest Element in an Array",             difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3Pld280", yt:"https://youtu.be/37E9ckMDdTk?t=527" },
        { id:39, name:"Second Largest Element in an Array",      difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3pFvBcN", yt:"https://youtu.be/37E9ckMDdTk?t=811" },
        { id:40, name:"Check if Array is Sorted",                difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3Ap9U6F", yt:"https://youtu.be/37E9ckMDdTk?t=1723" },
        { id:41, name:"Remove Duplicates from Sorted Array",     difficulty:"Easy",   lc:"https://leetcode.com/problems/remove-duplicates-from-sorted-array/", gfg:"https://bit.ly/3w7b6ck", yt:"https://youtu.be/37E9ckMDdTk?t=1886" },
        { id:42, name:"Left Rotate an Array by One Place",       difficulty:"Easy",   lc:"https://leetcode.com/problems/rotate-array/", gfg:"https://bit.ly/3dnn9vC", yt:"https://youtu.be/wvcQg43_V8U?t=61" },
        { id:43, name:"Left Rotate an Array by D Places",        difficulty:"Easy",   lc:"https://leetcode.com/problems/rotate-array/", gfg:"https://bit.ly/3dyCKZg", yt:"https://youtu.be/wvcQg43_V8U?t=485" },
        { id:44, name:"Move Zeros to End",                       difficulty:"Easy",   lc:"https://leetcode.com/problems/move-zeroes/", gfg:"https://bit.ly/3PrGIjT", yt:"https://youtu.be/wvcQg43_V8U?t=1633" },
        { id:45, name:"Linear Search",                           difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3KcpHcB", yt:"https://youtu.be/wvcQg43_V8U?t=2465" },
        { id:46, name:"Union and Intersection of Two Sorted Arrays", difficulty:"Easy", lc:null, gfg:"https://bit.ly/3Ap7Onp", yt:"https://youtu.be/wvcQg43_V8U?t=2584" },
        { id:47, name:"Find Missing Number in an Array",         difficulty:"Easy",   lc:"https://leetcode.com/problems/missing-number/", gfg:"https://bit.ly/3A2pKTh", yt:"https://youtu.be/bYWLJb3vCWY?t=58" },
        { id:48, name:"Maximum Consecutive Ones",                difficulty:"Easy",   lc:"https://leetcode.com/problems/max-consecutive-ones/", gfg:"https://bit.ly/3piuaAN", yt:"https://youtu.be/bYWLJb3vCWY?t=1124" },
        { id:49, name:"Find the Number Appearing Once",          difficulty:"Easy",   lc:"https://leetcode.com/problems/single-number/", gfg:"https://bit.ly/3dudCD8", yt:"https://youtu.be/bYWLJb3vCWY?t=1369" },
        { id:50, name:"Longest Subarray with Given Sum (Positives)", difficulty:"Easy", lc:null, gfg:null, yt:"https://youtu.be/frf7qxiN2qU" },
        { id:51, name:"Longest Subarray with Sum K (Pos + Neg)", difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3dyZdp3", yt:"https://youtu.be/frf7qxiN2qU" },
      ]},
      { id: "3.2", title: "Arrays — Medium", problems: [
        { id:52, name:"2Sum Problem",                            difficulty:"Medium", lc:"https://leetcode.com/problems/two-sum/", gfg:"https://bit.ly/3SVYU8f", yt:"https://www.youtube.com/watch?v=UXDSeD9mN-k", patternTags:["Two Pointer", "Hashing"] },
        { id:53, name:"Sort an Array of 0s, 1s and 2s",         difficulty:"Medium", lc:"https://leetcode.com/problems/sort-colors/", gfg:"https://bit.ly/3dsROaZ", yt:"https://www.youtube.com/watch?v=tp8JIuCXBaU", patternTags:["Two Pointer"] },
        { id:54, name:"Majority Element (> n/2 times)",         difficulty:"Medium", lc:"https://leetcode.com/problems/majority-element/", gfg:"https://bit.ly/3SSpeA3", yt:"https://www.youtube.com/watch?v=nP_ns3uSh80" },
        { id:55, name:"Kadane's Algorithm — Maximum Subarray Sum", difficulty:"Medium", lc:"https://leetcode.com/problems/maximum-subarray/", gfg:"https://bit.ly/3dzyloY", yt:"https://www.youtube.com/watch?v=AHZpyENo7k4", patternTags:["Kadane's Algorithm", "DP"] },
        { id:56, name:"Print Subarray with Maximum Sum",         difficulty:"Medium", lc:"https://leetcode.com/problems/maximum-subarray/", gfg:null, yt:"https://www.youtube.com/watch?v=AHZpyENo7k4", patternTags:["Kadane's Algorithm", "DP"] },
        { id:57, name:"Stock Buy and Sell",                      difficulty:"Medium", lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", gfg:"https://bit.ly/3DsRL4r", yt:"https://www.youtube.com/watch?v=excAOvwF_Wk", patternTags:["Greedy"] },
        { id:58, name:"Rearrange Array in Alternating +/- Sign", difficulty:"Medium", lc:"https://leetcode.com/problems/rearrange-array-elements-by-sign/", gfg:null, yt:"https://www.youtube.com/watch?v=h4aBagy4dhk", patternTags:["Two Pointer"] },
        { id:59, name:"Next Permutation",                        difficulty:"Medium", lc:"https://leetcode.com/problems/next-permutation/", gfg:"https://bit.ly/3DuMbre", yt:"https://www.youtube.com/watch?v=JDOXKqF60RQ", patternTags:["Two Pointer"] },
        { id:60, name:"Leaders in an Array",                     difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FZ5UfW", yt:"https://www.youtube.com/watch?v=cHrIT5TKA6A" },
        { id:61, name:"Longest Consecutive Sequence",            difficulty:"Medium", lc:"https://leetcode.com/problems/longest-consecutive-sequence/", gfg:"https://bit.ly/3Peq4Uo", yt:"https://www.youtube.com/watch?v=oO5uLE7EUlM", patternTags:["Hashing"] },
        { id:62, name:"Set Matrix Zeros",                        difficulty:"Medium", lc:"https://leetcode.com/problems/set-matrix-zeroes/", gfg:"https://bit.ly/3JsrJBf", yt:"https://www.youtube.com/watch?v=N0MgLvceX7M", patternTags:["Matrix"] },
        { id:63, name:"Rotate Matrix by 90 Degrees",             difficulty:"Medium", lc:"https://leetcode.com/problems/rotate-image/", gfg:"https://bit.ly/3Q3BSPE", yt:"https://www.youtube.com/watch?v=Z0R2u6gd3GU", patternTags:["Matrix"] },
        { id:64, name:"Spiral Traversal of Matrix",              difficulty:"Medium", lc:"https://leetcode.com/problems/spiral-matrix/", gfg:"https://bit.ly/3Pnywrd", yt:"https://www.youtube.com/watch?v=3Zv1H7ZECqM", patternTags:["Matrix"] },
        { id:65, name:"Count Subarrays with Given Sum",          difficulty:"Medium", lc:"https://leetcode.com/problems/subarray-sum-equals-k/", gfg:"https://bit.ly/3DlmzeV", yt:"https://www.youtube.com/watch?v=xvNwoz-ufXA", patternTags:["Prefix Sum", "Hashing"] },
      ]},
      { id: "3.3", title: "Arrays — Hard", problems: [
        { id:66, name:"Pascal's Triangle",                       difficulty:"Hard",   lc:"https://leetcode.com/problems/pascals-triangle/", gfg:"https://bit.ly/3MH0Xhb", yt:"https://www.youtube.com/watch?v=bR7mQgwQ_o8" },
        { id:67, name:"Majority Element (n/3 times)",            difficulty:"Hard",   lc:"https://leetcode.com/problems/majority-element-ii/", gfg:"https://bit.ly/3Etg6Bb", yt:"https://www.youtube.com/watch?v=vwZj1K0e9U8" },
        { id:68, name:"3-Sum Problem",                           difficulty:"Hard",   lc:"https://leetcode.com/problems/3sum/", gfg:"https://bit.ly/3MJKRxS", yt:"https://www.youtube.com/watch?v=DhFh8Kw7ymk", patternTags:["Two Pointer", "Sorting"] },
        { id:69, name:"4-Sum Problem",                           difficulty:"Hard",   lc:"https://leetcode.com/problems/4sum/", gfg:"https://bit.ly/3It5SyP", yt:"https://www.youtube.com/watch?v=eD95WRfh81c", patternTags:["Two Pointer", "Sorting"] },
        { id:70, name:"Largest Subarray with 0 Sum",             difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3rRkdIm", yt:"https://www.youtube.com/watch?v=xmguZ6GbatA", patternTags:["Prefix Sum", "Hashing"] },
        { id:71, name:"Count Subarrays with given XOR K",        difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3JdpMNe", yt:"https://www.youtube.com/watch?v=eZr-6p0B7ME", patternTags:["Prefix Sum", "Hashing", "Bit Manipulation"] },
        { id:72, name:"Merge Overlapping Subintervals",          difficulty:"Hard",   lc:"https://leetcode.com/problems/merge-intervals/", gfg:"https://bit.ly/3w40Xzc", yt:"https://www.youtube.com/watch?v=IexN60k62jo", patternTags:["Sorting", "Intervals"] },
        { id:73, name:"Merge Two Sorted Arrays Without Extra Space", difficulty:"Hard", lc:"https://leetcode.com/problems/merge-sorted-array/", gfg:"https://bit.ly/3E1TJqu", yt:"https://www.youtube.com/watch?v=n7uwj04E0I4" },
        { id:74, name:"Find the Repeating and Missing Number",   difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3Peqzme", yt:"https://www.youtube.com/watch?v=2D0D8HE6uak" },
        { id:75, name:"Count Inversions",                        difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3gfxTm7", yt:"https://www.youtube.com/watch?v=AseUmwVNaoY" },
        { id:76, name:"Reverse Pairs",                           difficulty:"Hard",   lc:"https://leetcode.com/problems/reverse-pairs/", gfg:"https://bit.ly/3DNszaG", yt:"https://www.youtube.com/watch?v=S6rsAlj_iB4", patternTags:["Merge Sort", "Divide and Conquer"] },
        { id:77, name:"Maximum Product Subarray",                difficulty:"Hard",   lc:"https://leetcode.com/problems/maximum-product-subarray/", gfg:"https://bit.ly/3gZGaQH", yt:"https://www.youtube.com/watch?v=hnswaLJvr6g", patternTags:["DP"] },
      ]},
    ]
};

const TOPIC_BINARY_SEARCH = {
    stepId: "step4", stepTitle: "Step 4: Binary Search", color: "#F59E0B",
    subtopics: [
      { id: "4.1", title: "BS on 1D Arrays", problems: [
        { id:200, name:"Binary Search to find X in sorted array",        difficulty:"Easy",   lc:"https://leetcode.com/problems/binary-search/", gfg:"https://bit.ly/3uOoxBR", yt:"https://youtu.be/MHf6awe89xw", patternTags:["Binary Search"] },
        { id:201, name:"Implement Lower Bound",                          difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SBxvb8", yt:"https://youtu.be/asWf1wHosCM", patternTags:["Binary Search"] },
        { id:202, name:"Implement Upper Bound",                          difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/implement-upper-bound/1", yt:"https://youtu.be/asWf1wHosCM", patternTags:["Binary Search"] },
        { id:203, name:"Search Insert Position",                         difficulty:"Easy",   lc:"https://leetcode.com/problems/search-insert-position/", gfg:"https://www.geeksforgeeks.org/problems/search-insert-position-of-k-in-a-sorted-array/1", yt:"https://youtu.be/F-Lu1qid6V8", patternTags:["Binary Search"] },
        { id:204, name:"Floor and Ceil in Sorted Array",                 difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3rwApSc", yt:"https://youtu.be/dgM3X4kjvkY", patternTags:["Binary Search"] },
        { id:205, name:"First and Last Occurrence in Sorted Array",      difficulty:"Medium", lc:"https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", gfg:"https://bit.ly/3UjFvJW", yt:"https://youtu.be/JrQncFKf1y8", patternTags:["Binary Search"] },
        { id:206, name:"Count Occurrences in Sorted Array",              difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3CHiTLn", yt:"https://youtu.be/U42edWdQGEY", patternTags:["Binary Search"] },
        { id:207, name:"Search in Rotated Sorted Array I",               difficulty:"Medium", lc:"https://leetcode.com/problems/search-in-rotated-sorted-array/", gfg:"https://bit.ly/3UfPP9r", yt:"https://youtu.be/r3pMQ8-Ad5s", patternTags:["Binary Search"] },
        { id:208, name:"Search in Rotated Sorted Array II",              difficulty:"Medium", lc:"https://leetcode.com/problems/search-in-rotated-sorted-array-ii/", gfg:"https://bit.ly/3UfQqJI", yt:"https://youtu.be/w2G2W6zZmYY", patternTags:["Binary Search"] },
        { id:209, name:"Find Minimum in Rotated Sorted Array",           difficulty:"Medium", lc:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", gfg:"https://bit.ly/3SBcb6V", yt:"https://youtu.be/4rTSi8bnoFE", patternTags:["Binary Search"] },
        { id:210, name:"Find how many times array is rotated",          difficulty:"Medium", lc:null, gfg:"https://bit.ly/3CKxTwx", yt:"https://youtu.be/jSmwmkbfgZ4", patternTags:["Binary Search"] },
        { id:211, name:"Single Element in a Sorted Array",               difficulty:"Medium", lc:"https://leetcode.com/problems/single-element-in-a-sorted-array/", gfg:"https://bit.ly/3CHpReQ", yt:"https://youtu.be/PzXSps6sERg", patternTags:["Binary Search"] },
        { id:212, name:"Find Peak Element",                              difficulty:"Hard",   lc:"https://leetcode.com/problems/find-peak-element/", gfg:"https://bit.ly/3rzYbZv", yt:"https://youtu.be/cZ_LCdcKEUw", patternTags:["Binary Search"] },
      ]},
      { id: "4.2", title: "BS on Answers", problems: [
        { id:213, name:"Find Square Root of a Number",                   difficulty:"Easy",   lc:"https://leetcode.com/problems/sqrtx/", gfg:"https://bit.ly/3rwwo8u", yt:"https://youtu.be/F3jyy1JmTAY", patternTags:["Binary Search"] },
        { id:214, name:"Find Nth Root of a Number",                      difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3Su5pQ4", yt:"https://youtu.be/WfQEzfaPe-A", patternTags:["Binary Search"] },
        { id:215, name:"Koko Eating Bananas",                            difficulty:"Medium", lc:"https://leetcode.com/problems/koko-eating-bananas/", gfg:"https://bit.ly/3CFvA3s", yt:"https://youtu.be/CVqEdHDQv8I", patternTags:["Binary Search"] },
        { id:216, name:"Minimum Days to Make M Bouquets",                difficulty:"Medium", lc:"https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/", gfg:"https://bit.ly/3FfXIAi", yt:"https://youtu.be/4lqaflmrCYU", patternTags:["Binary Search"] },
        { id:217, name:"Find the Smallest Divisor Given a Threshold",    difficulty:"Medium", lc:"https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/", gfg:"https://bit.ly/3UfqVcN", yt:"https://youtu.be/h9b8jx8oVe8", patternTags:["Binary Search"] },
        { id:218, name:"Capacity to Ship Packages within D Days",        difficulty:"Medium", lc:"https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", gfg:"https://bit.ly/3UoUEYY", yt:"https://youtu.be/lhSi8ECt9Hs", patternTags:["Binary Search"] },
        { id:219, name:"Kth Missing Positive Number",                    difficulty:"Easy",   lc:"https://leetcode.com/problems/kth-missing-positive-number/", gfg:null, yt:"https://youtu.be/-Eyj0_HBkXk", patternTags:["Binary Search"] },
        { id:220, name:"Aggressive Cows",                                difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3UoUuYf", yt:"https://youtu.be/abLecKsj8gA", patternTags:["Binary Search"] },
        { id:221, name:"Book Allocation Problem",                        difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3CMlVMU", yt:"https://youtu.be/2JpAJjACS-w", patternTags:["Binary Search"] },
        { id:222, name:"Split Array — Largest Sum",                      difficulty:"Hard",   lc:"https://leetcode.com/problems/split-array-largest-sum/", gfg:"https://bit.ly/3SY1Eqz", yt:"https://youtu.be/_374SbcbsT8", patternTags:["Binary Search"] },
        { id:223, name:"Painter's Partition Problem",                    difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3F08jUH", yt:"https://youtu.be/SHOSnnQjjkY", patternTags:["Binary Search"] },
        { id:224, name:"Minimize Max Distance to Gas Station",           difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3UoUYbE", yt:"https://youtu.be/D69bxX1mb2I", patternTags:["Binary Search"] },
        { id:225, name:"Median of Two Sorted Arrays",                    difficulty:"Hard",   lc:"https://leetcode.com/problems/median-of-two-sorted-arrays/", gfg:"https://bit.ly/3rzMVN5", yt:"https://youtu.be/NTop3VTjmxk", patternTags:["Binary Search"] },
        { id:226, name:"K-th Element of Two Sorted Arrays",              difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3CMxOPP", yt:"https://youtu.be/F3o7ms94MQM", patternTags:["Binary Search"] },
      ]},
      { id: "4.3", title: "BS on 2D Arrays", problems: [
        { id:227, name:"Find the Row with Maximum 1s",                   difficulty:"Medium", lc:null, gfg:"https://bit.ly/3CKaq5b", yt:"https://youtu.be/Zk39FF_h2tk", patternTags:["Binary Search", "Matrix"] },
        { id:228, name:"Search in a 2D Matrix",                          difficulty:"Medium", lc:"https://leetcode.com/problems/search-a-2d-matrix/", gfg:"https://bit.ly/3SVCKwH", yt:"https://youtu.be/h1d4hb-l5xY", patternTags:["Binary Search", "Matrix"] },
        { id:229, name:"Search in a 2D Matrix II",                       difficulty:"Medium", lc:"https://leetcode.com/problems/search-a-2d-matrix-ii/", gfg:"https://bit.ly/3UoVAGr", yt:"https://youtu.be/MQc4SeAGS04", patternTags:["Binary Search", "Matrix"] },
        { id:230, name:"Find Peak Element (2D Matrix)",                  difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3UoVCmM", yt:"https://youtu.be/eD3CxhAY-1k", patternTags:["Binary Search", "Matrix"] },
        { id:231, name:"Median in a Row-wise Sorted Matrix",             difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3rySrbS", yt:"https://youtu.be/63dRWLs8Ev4", patternTags:["Binary Search", "Matrix"] },
      ]},
    ]
};

const TOPIC_STRINGS = {
    stepId: "step5", stepTitle: "Step 5: Strings", color: "#EC4899",
    subtopics: [
      { id: "5.1", title: "Strings — Basic", problems: [
        { id:250, name:"Remove Outermost Parentheses",                  difficulty:"Easy",   lc:"https://leetcode.com/problems/remove-outermost-parentheses/", gfg:null, yt:"https://youtu.be/UXraB-VYSWQ", patternTags:["Strings"] },
        { id:251, name:"Reverse Words in a String",                     difficulty:"Easy",   lc:"https://leetcode.com/problems/reverse-words-in-a-string/", gfg:"https://bit.ly/3UkBIzx", yt:"https://youtu.be/Y6llV1Wcd6g", patternTags:["Strings"] },
        { id:252, name:"Largest Odd Number in String",                  difficulty:"Easy",   lc:"https://leetcode.com/problems/largest-odd-number-in-string/", gfg:null, yt:"https://youtu.be/4ptiqCRDmTI", patternTags:["Strings"] },
        { id:253, name:"Longest Common Prefix",                         difficulty:"Easy",   lc:"https://leetcode.com/problems/longest-common-prefix/", gfg:"https://bit.ly/3Sd0pZf", yt:"https://youtu.be/0sWShKIJoo4", patternTags:["Strings"] },
        { id:254, name:"Isomorphic Strings",                            difficulty:"Easy",   lc:"https://leetcode.com/problems/isomorphic-strings/", gfg:"https://bit.ly/3SkO0OV", yt:"https://youtu.be/SU617cTmO6I", patternTags:["Strings", "Hashing"] },
        { id:255, name:"Check Whether One String is a Rotation of Another", difficulty:"Easy", lc:"https://leetcode.com/problems/rotate-string/", gfg:"https://bit.ly/3eC8mw6", yt:"https://youtu.be/HsVk0Wc4M5M", patternTags:["Strings"] },
        { id:256, name:"Check if Two Strings are Anagram",              difficulty:"Easy",   lc:"https://leetcode.com/problems/valid-anagram/", gfg:"https://bit.ly/3Cv9TQt", yt:"https://youtu.be/V73fEcUVwTI", patternTags:["Strings", "Hashing"] },
      ]},
      { id: "5.2", title: "Strings — Medium/Hard", problems: [
        { id:257, name:"Sort Characters by Frequency",                  difficulty:"Medium", lc:"https://leetcode.com/problems/sort-characters-by-frequency/", gfg:"https://bit.ly/3eFAtuG", yt:"https://youtu.be/Y6m0ATahsi8", patternTags:["Strings", "Hashing", "Sorting"] },
        { id:258, name:"Maximum Nesting Depth of Parentheses",          difficulty:"Medium", lc:"https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/", gfg:null, yt:"https://youtu.be/eN1ad7t8U0c", patternTags:["Strings", "Stack"] },
        { id:259, name:"Roman Number to Integer and Vice Versa",        difficulty:"Medium", lc:"https://leetcode.com/problems/roman-to-integer/", gfg:"https://bit.ly/3Cw1k49", yt:"https://youtu.be/Q5RagqQGCXM", patternTags:["Strings", "Greedy"] },
        { id:260, name:"Implement ATOI / STRSTR",                       difficulty:"Medium", lc:"https://leetcode.com/problems/string-to-integer-atoi/", gfg:"https://bit.ly/3UpJzlV", yt:"https://youtu.be/c3hXnRMHpZk", patternTags:["Strings"] },
        { id:261, name:"Count Number of Substrings",                    difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3SkVuwL", yt:"https://youtu.be/CMpDDP-LzVU", patternTags:["Strings", "Sliding Window"] },
        { id:262, name:"Longest Palindromic Substring",                 difficulty:"Medium", lc:"https://leetcode.com/problems/longest-palindromic-substring/", gfg:"https://bit.ly/3eF3wT9", yt:"https://youtu.be/XYQecbcd6_c", patternTags:["Strings", "DP"] },
        { id:263, name:"Sum of Beauty of All Substrings",               difficulty:"Medium", lc:"https://leetcode.com/problems/sum-of-beauty-of-all-substrings/", gfg:null, yt:"https://youtu.be/-FNCsTzfDtY", patternTags:["Strings"] },
        { id:264, name:"Reverse Every Word in a Given String",          difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/reverse-each-word-in-a-given-string1001/1", yt:"https://youtu.be/Y6llV1Wcd6g", patternTags:["Strings"] },
      ]},
    ]
};

const TOPIC_LINKED_LIST = {
    stepId: "step6", stepTitle: "Step 6: Learn LinkedList", color: "#06B6D4",
    subtopics: [
      { id: "6.1", title: "Learn 1D LinkedList", problems: [
        { id:280, name:"Introduction to LinkedList",              difficulty:"Easy", lc:null, gfg:"https://bit.ly/3CGCnvm", yt:"https://youtu.be/zLhLLOms2tg", patternTags:["Linked List"] },
        { id:281, name:"Inserting a node in LinkedList",          difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3UoO0wL", yt:"https://youtu.be/jVHTuOTLwQk", patternTags:["Linked List"] },
        { id:282, name:"Deleting a node in LinkedList",           difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FbiwHi", yt:"https://youtu.be/JHCpwfx2sNc", patternTags:["Linked List"] },
        { id:283, name:"Find the Length of the LinkedList",       difficulty:"Easy", lc:null, gfg:"https://bit.ly/3SQ0FOt", yt:"https://youtu.be/IsoQTyJDk2k", patternTags:["Linked List"] },
        { id:284, name:"Search an Element in the LL",             difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FcTRnD", yt:"https://youtu.be/X3X18cY8RtY", patternTags:["Linked List"] },
      ]},
      { id: "6.2", title: "Learn Doubly LinkedList", problems: [
        { id:285, name:"Introduction to DLL",                     difficulty:"Easy", lc:null, gfg:"https://bit.ly/3SK8mvg", yt:"https://youtu.be/sE0fa3ItpHg", patternTags:["Linked List"] },
        { id:286, name:"Insert a node in DLL",                    difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3UqAJsP", yt:"https://youtu.be/SbVEXx_l0ng", patternTags:["Linked List"] },
        { id:287, name:"Delete a node in DLL",                    difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FcW3J0", yt:"https://youtu.be/eVy0qcPYRb4", patternTags:["Linked List"] },
        { id:288, name:"Reverse a DLL",                           difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SOPzdr", yt:"https://youtu.be/u0WrxfRza1A", patternTags:["Linked List"] },
      ]},
      { id: "6.3", title: "Medium Problems of LL", problems: [
        { id:289, name:"Middle of a LinkedList",                  difficulty:"Medium", lc:"https://leetcode.com/problems/middle-of-the-linked-list/", gfg:"https://bit.ly/3UoXgVi", yt:"https://youtu.be/sGdwSH8RK-o", patternTags:["Linked List", "Two Pointer"] },
        { id:290, name:"Reverse a LinkedList",                    difficulty:"Medium", lc:"https://leetcode.com/problems/reverse-linked-list/", gfg:"https://bit.ly/3UoXC4d", yt:"https://youtu.be/D2vI2DNJGd8", patternTags:["Linked List"] },
        { id:291, name:"Detect a Loop in LL",                     difficulty:"Medium", lc:"https://leetcode.com/problems/linked-list-cycle/", gfg:"https://bit.ly/3CGD4Wn", yt:"https://youtu.be/wiOq7VVr-IA", patternTags:["Linked List", "Two Pointer"] },
        { id:292, name:"Find the Starting Point of LL",           difficulty:"Medium", lc:"https://leetcode.com/problems/linked-list-cycle-ii/", gfg:"https://bit.ly/3UoYbCD", yt:"https://youtu.be/2Kd0g3wonOY", patternTags:["Linked List", "Two Pointer"] },
        { id:293, name:"Length of Loop in LL",                    difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SLwf3F", yt:"https://youtu.be/I4g1qbkTPus", patternTags:["Linked List", "Two Pointer"] },
        { id:294, name:"Check if LL is Palindrome",               difficulty:"Medium", lc:"https://leetcode.com/problems/palindrome-linked-list/", gfg:"https://bit.ly/3FaCwvD", yt:"https://youtu.be/-DA4BGGiHTQ", patternTags:["Linked List", "Two Pointer"] },
        { id:295, name:"Segregate Odd and Even Nodes in LL",      difficulty:"Medium", lc:"https://leetcode.com/problems/odd-even-linked-list/", gfg:null, yt:"https://youtu.be/qcEAA5Sw_dY", patternTags:["Linked List"] },
        { id:296, name:"Remove Nth Node from the Back of LL",     difficulty:"Medium", lc:"https://leetcode.com/problems/remove-nth-node-from-end-of-list/", gfg:"https://bit.ly/3SLxnz1", yt:"https://youtu.be/Th7Hbm5DPKw", patternTags:["Linked List", "Two Pointer"] },
        { id:297, name:"Delete the Middle Node of LL",            difficulty:"Medium", lc:"https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/", gfg:null, yt:"https://youtu.be/EE2OSjlfTM4", patternTags:["Linked List", "Two Pointer"] },
        { id:298, name:"Sort a LinkedList",                       difficulty:"Medium", lc:"https://leetcode.com/problems/sort-list/", gfg:"https://bit.ly/3rzeeel", yt:"https://youtu.be/TGfQu0bSNI0", patternTags:["Linked List", "Merge Sort"] },
        { id:299, name:"Sort a LL of 0's, 1's and 2's",          difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3eJVDtY", yt:"https://youtu.be/RhqXjAh8t1s", patternTags:["Linked List"] },
        { id:300, name:"Find the Intersection Point of Y LL",     difficulty:"Medium", lc:"https://leetcode.com/problems/intersection-of-two-linked-lists/", gfg:"https://bit.ly/3CHzWO0", yt:"https://youtu.be/0DYoPz2Tpt4", patternTags:["Linked List", "Two Pointer"] },
        { id:301, name:"Add 1 to a Number Represented by LinkedList", difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FdHzCx", yt:"https://youtu.be/aLZRdf2nQzI", patternTags:["Linked List"] },
        { id:302, name:"Add 2 Numbers in LinkedList",             difficulty:"Medium", lc:"https://leetcode.com/problems/add-two-numbers/", gfg:"https://bit.ly/3SOMS1y", yt:"https://youtu.be/XmRrGzR6udg", patternTags:["Linked List"] },
        { id:303, name:"Delete all occurrences of a key in DLL",  difficulty:"Medium", lc:null, gfg:null, yt:"https://youtu.be/RcMzC9P9DvE", patternTags:["Linked List"] },
      ]},
      { id: "6.4", title: "Medium Problems of DLL", problems: [
        { id:304, name:"Find pairs with given sum in DLL",         difficulty:"Medium", lc:null, gfg:"https://bit.ly/3rwbDFK", yt:"https://youtu.be/9OM5qllt4MY", patternTags:["Linked List", "Two Pointer"] },
        { id:305, name:"Remove duplicates from sorted DLL",        difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FfTKlp", yt:"https://youtu.be/aB1aN5pcyDY", patternTags:["Linked List"] },
        { id:306, name:"Reverse DLL in groups of given size K",   difficulty:"Medium", lc:null, gfg:null, yt:"https://youtu.be/wH-DbWNasGY", patternTags:["Linked List"] },
      ]},
      { id: "6.5", title: "Hard Problems of LL", problems: [
        { id:307, name:"Rotate a LinkedList",                      difficulty:"Medium", lc:"https://leetcode.com/problems/rotate-list/", gfg:"https://bit.ly/3SOQXBl", yt:"https://youtu.be/9VPm6nEbVPA", patternTags:["Linked List"] },
        { id:308, name:"Reverse LinkedList in groups of size K",   difficulty:"Hard",   lc:"https://leetcode.com/problems/reverse-nodes-in-k-group/", gfg:"https://bit.ly/3FdLzgU", yt:"https://youtu.be/Of0HPkk3JgI", patternTags:["Linked List"] },
        { id:309, name:"Flattening of LL",                         difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3UqgEPN", yt:"https://youtu.be/ZQR9Y8E1Cdo", patternTags:["Linked List", "Merge Sort"] },
        { id:310, name:"Clone a Linked List with random and next pointer", difficulty:"Hard", lc:"https://leetcode.com/problems/copy-list-with-random-pointer/", gfg:"https://bit.ly/3UqgQfg", yt:"https://youtu.be/VNf6VynfpdM", patternTags:["Linked List", "Hashing"] },
      ]},
    ]
};

const TOPIC_RECURSION = {
    stepId: "step7", stepTitle: "Step 7: Recursion [PatternWise]", color: "#8B5CF6",
    subtopics: [
      { id: "7.1", title: "Get a Strong Hold", problems: [
        { id:320, name:"Recursive Implementation of atoi()",     difficulty:"Medium", lc:"https://leetcode.com/problems/string-to-integer-atoi/", gfg:"https://bit.ly/3UpJzlV", yt:"https://youtu.be/c3hXnRMHpZk", patternTags:["Recursion"] },
        { id:321, name:"Pow(x, n)",                              difficulty:"Medium", lc:"https://leetcode.com/problems/powx-n/", gfg:"https://bit.ly/3FdW7tt", yt:"https://youtu.be/l0YC3876qxg", patternTags:["Recursion"] },
        { id:322, name:"Count Good Numbers",                     difficulty:"Medium", lc:"https://leetcode.com/problems/count-good-numbers/", gfg:null, yt:"https://youtu.be/eUv3vy9wf6w", patternTags:["Recursion"] },
        { id:323, name:"Sort a Stack using Recursion",           difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3rxNgrR", yt:"https://youtu.be/8tNqXraB_Zo", patternTags:["Recursion", "Stack"] },
        { id:324, name:"Reverse a Stack using Recursion",        difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/reverse-a-stack/1", yt:"https://youtu.be/-3do_yhcwgY", patternTags:["Recursion", "Stack"] },
      ]},
      { id: "7.2", title: "Subsequences Pattern", problems: [
        { id:325, name:"Generate all Binary Strings",            difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3W1OY8Z", yt:"https://youtu.be/lWy9YIvb9X4", patternTags:["Recursion", "Subsequences"] },
        { id:326, name:"Generate Parentheses",                   difficulty:"Medium", lc:"https://leetcode.com/problems/generate-parentheses/", gfg:null, yt:"https://youtu.be/s9fokUqJ76A", patternTags:["Recursion", "Backtracking"] },
        { id:327, name:"Generate Power Set",                     difficulty:"Medium", lc:"https://leetcode.com/problems/subsets/", gfg:"https://bit.ly/3CR1Wk6", yt:"https://youtu.be/b7AYbpM5YrE", patternTags:["Recursion", "Subsequences"] },
        { id:328, name:"Count All Subsequences with Sum K",      difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FfZGo5", yt:"https://youtu.be/9_Gjm0HF3uM", patternTags:["Recursion", "Subsequences"] },
        { id:329, name:"Check if there is a Subsequence with Sum K", difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/check-if-given-array-is-a-subarray/1", yt:"https://youtu.be/AxNKKBqXMtY", patternTags:["Recursion", "Subsequences"] },
        { id:330, name:"Combination Sum",                        difficulty:"Medium", lc:"https://leetcode.com/problems/combination-sum/", gfg:"https://bit.ly/3rzjF1c", yt:"https://youtu.be/G1fRTGRxXU8", patternTags:["Recursion", "Subsequences"] },
        { id:331, name:"Combination Sum II",                     difficulty:"Medium", lc:"https://leetcode.com/problems/combination-sum-ii/", gfg:"https://bit.ly/3rzkmZ4", yt:"https://youtu.be/G1fRTGRxXU8", patternTags:["Recursion", "Subsequences"] },
        { id:332, name:"Subset Sum I",                           difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FgaQv9", yt:"https://youtu.be/9oI8Sb02ON4", patternTags:["Recursion", "Subsequences"] },
        { id:333, name:"Subset Sum II",                          difficulty:"Medium", lc:"https://leetcode.com/problems/subsets-ii/", gfg:"https://bit.ly/3UqOtkp", yt:"https://youtu.be/AB6Ei2ColIk", patternTags:["Recursion", "Subsequences"] },
        { id:334, name:"Combination Sum III",                    difficulty:"Medium", lc:"https://leetcode.com/problems/combination-sum-iii/", gfg:null, yt:"https://youtu.be/G1fRTGRxXU8", patternTags:["Recursion", "Subsequences"] },
        { id:335, name:"Letter Combinations of a Phone Number",  difficulty:"Medium", lc:"https://leetcode.com/problems/letter-combinations-of-a-phone-number/", gfg:"https://bit.ly/3UqOL0V", yt:"https://youtu.be/BMxBSQVkqT8", patternTags:["Recursion", "Subsequences"] },
        { id:336, name:"Palindrome Partitioning",                difficulty:"Medium", lc:"https://leetcode.com/problems/palindrome-partitioning/", gfg:"https://bit.ly/3SU9Fxc", yt:"https://youtu.be/_rgWtxJOZNc", patternTags:["Recursion", "Subsequences"] },
        { id:337, name:"Word Search",                            difficulty:"Medium", lc:"https://leetcode.com/problems/word-search/", gfg:"https://bit.ly/3FeUd23", yt:"https://youtu.be/asLavszr3Pg", patternTags:["Recursion", "Backtracking"] },
      ]},
      { id: "7.3", title: "Trying out all Combos / Hard", problems: [
        { id:338, name:"N Queens",                               difficulty:"Hard",   lc:"https://leetcode.com/problems/n-queens/", gfg:"https://bit.ly/3rxgWbf", yt:"https://youtu.be/i05Ju7AftcM", patternTags:["Recursion", "Backtracking"] },
        { id:339, name:"Rat in a Maze",                          difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3SUaPJZ", yt:"https://youtu.be/bld_Bnm4ywI", patternTags:["Recursion", "Backtracking"] },
        { id:340, name:"Word Break",                             difficulty:"Medium", lc:"https://leetcode.com/problems/word-break/", gfg:"https://bit.ly/3FeUiKQ", yt:"https://youtu.be/0OY-tJOukfg", patternTags:["Recursion", "DP"] },
        { id:341, name:"M Coloring Problem",                     difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3FfQiQt", yt:"https://youtu.be/wuVwUK25Rfc", patternTags:["Recursion", "Backtracking", "Graphs"] },
        { id:342, name:"Palindrome Partitioning II",             difficulty:"Hard",   lc:"https://leetcode.com/problems/palindrome-partitioning-ii/", gfg:"https://bit.ly/3SUaTw1", yt:"https://youtu.be/_rgWtxJOZNc", patternTags:["Recursion", "DP"] },
        { id:343, name:"Kth Permutation Sequence",               difficulty:"Hard",   lc:"https://leetcode.com/problems/permutation-sequence/", gfg:"https://bit.ly/3FgbZbs", yt:"https://youtu.be/QyBhJzqDcSk", patternTags:["Recursion"] },
        { id:344, name:"Permutations of a String/Array",         difficulty:"Medium", lc:"https://leetcode.com/problems/permutations/", gfg:"https://bit.ly/3roYDoH", yt:"https://youtu.be/YBzNi9rmTRA", patternTags:["Recursion", "Backtracking"] },
        { id:345, name:"All Paths from Source to Target",        difficulty:"Medium", lc:"https://leetcode.com/problems/all-paths-from-source-to-target/", gfg:null, yt:"https://youtu.be/ROZTYwbBcQk", patternTags:["Recursion", "Graphs"] },
      ]},
    ]
};

const TOPIC_BIT_MANIPULATION = {
    stepId: "step8", stepTitle: "Step 8: Bit Manipulation", color: "#22D3EE",
    subtopics: [
      { id: "8.1", title: "Learn Bit Manipulation", problems: [
        { id:350, name:"Introduction to Bit Manipulation",       difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FaCtqf", yt:"https://youtu.be/iEh5xfns3MQ", patternTags:["Bit Manipulation"] },
        { id:351, name:"Check if the i-th Bit is Set/Unset",     difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3CMaVRH", yt:"https://youtu.be/2oGPODyq0kY", patternTags:["Bit Manipulation"] },
        { id:352, name:"Check if a Number is Odd",               difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FeyEXm", yt:"https://youtu.be/2oGPODyq0kY", patternTags:["Bit Manipulation"] },
        { id:353, name:"Check if a Number is Power of 2",        difficulty:"Easy",   lc:"https://leetcode.com/problems/power-of-two/", gfg:"https://bit.ly/3UrfO5L", yt:"https://youtu.be/2oGPODyq0kY", patternTags:["Bit Manipulation"] },
        { id:354, name:"Count the Number of Set Bits",           difficulty:"Easy",   lc:"https://leetcode.com/problems/number-of-1-bits/", gfg:"https://bit.ly/3SVPyRr", yt:"https://youtu.be/iVTYa6F12Ko", patternTags:["Bit Manipulation"] },
        { id:355, name:"Set/Unset the Rightmost Unset Bit",      difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SVQa1z", yt:"https://youtu.be/8wo6cVUFViI", patternTags:["Bit Manipulation"] },
        { id:356, name:"Swap Two Numbers",                       difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FgdRG7", yt:"https://youtu.be/8wo6cVUFViI", patternTags:["Bit Manipulation"] },
        { id:357, name:"Divide Two Integers without Mul/Div/Mod",difficulty:"Medium", lc:"https://leetcode.com/problems/divide-two-integers/", gfg:"https://bit.ly/3CFjpZx", yt:"https://youtu.be/-W2-3Hbc-l8", patternTags:["Bit Manipulation"] },
      ]},
      { id: "8.2", title: "Interview Problems", problems: [
        { id:358, name:"Count Number of Bits to be Flipped",     difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FgdjFV", yt:"https://youtu.be/Hf7nrJL1HKA", patternTags:["Bit Manipulation"] },
        { id:359, name:"Find the Number that Appears Odd Times", difficulty:"Easy", lc:"https://leetcode.com/problems/single-number/", gfg:"https://bit.ly/3FgdM9z", yt:"https://youtu.be/jrXa4XS-fb4", patternTags:["Bit Manipulation"] },
        { id:360, name:"Power Set — Print All Subsets",          difficulty:"Medium", lc:"https://leetcode.com/problems/subsets/", gfg:"https://bit.ly/3CR1Wk6", yt:"https://youtu.be/b7AYbpM5YrE", patternTags:["Bit Manipulation", "Recursion"] },
        { id:361, name:"Find XOR of Numbers from L to R",        difficulty:"Medium", lc:null, gfg:"https://bit.ly/3CR1WCl", yt:"https://youtu.be/lcfzMtaxsro", patternTags:["Bit Manipulation"] },
        { id:362, name:"Find the Two Numbers Appearing Odd Times",difficulty:"Medium", lc:"https://leetcode.com/problems/single-number-iii/", gfg:"https://bit.ly/3FgdM3M", yt:"https://youtu.be/sLOpY3oHfWY", patternTags:["Bit Manipulation"] },
      ]},
      { id: "8.3", title: "Advanced Maths", problems: [
        { id:363, name:"Print Prime Factors of a Number",        difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SVR0o7", yt:"https://youtu.be/LT1Vge2Pjqo", patternTags:["Maths"] },
        { id:364, name:"All Divisors of a Number",               difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3CR2x3a", yt:"https://youtu.be/LT1Vge2Pjqo", patternTags:["Maths"] },
        { id:365, name:"Sieve of Eratosthenes",                  difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FgeBQO", yt:"https://youtu.be/LT1Vge2Pjqo", patternTags:["Maths"] },
        { id:3651, name:"Find Prime Factorisation using Sieve",  difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FgeBQO", yt:"https://youtu.be/LT1Vge2Pjqo", patternTags:["Maths"] },
        { id:366, name:"Find Power (x^n) with Modulo Value",     difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FdW7tt", yt:"https://youtu.be/l0YC3876qxg", patternTags:["Maths", "Recursion"] },
        { id:367, name:"Find GCD/HCF of Two Numbers",            difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3CR2QXa", yt:"https://youtu.be/LT1Vge2Pjqo", patternTags:["Maths"] },
      ]},
    ]
};

const TOPIC_STACK_QUEUES = {
    stepId: "step9", stepTitle: "Step 9: Stack and Queues", color: "#FB923C",
    subtopics: [
      { id: "9.1", title: "Learning", problems: [
        { id:380, name:"Implement Stack using Arrays",            difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3UrhP0u", yt:"https://youtu.be/GYptUgnIM_I", patternTags:["Stack"] },
        { id:381, name:"Implement Queue using Arrays",            difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FfRSGn", yt:"https://youtu.be/jTYOFXsv1cM", patternTags:["Queue"] },
        { id:384, name:"Implement Stack using Queue",             difficulty:"Easy",   lc:"https://leetcode.com/problems/implement-stack-using-queues/", gfg:"https://bit.ly/3CSjqrr", yt:"https://youtu.be/jDZQKzEtbYE", patternTags:["Stack", "Queue"] },
        { id:385, name:"Implement Queue using Stack",             difficulty:"Medium", lc:"https://leetcode.com/problems/implement-queue-using-stacks/", gfg:"https://bit.ly/3CSjxNb", yt:"https://youtu.be/jTYOFXsv1cM", patternTags:["Stack", "Queue"] },
        { id:382, name:"Implement Stack using LinkedList",        difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SUbsCl", yt:"https://youtu.be/GYptUgnIM_I", patternTags:["Stack", "Linked List"] },
        { id:383, name:"Implement Queue using LinkedList",        difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FeVepW", yt:"https://youtu.be/jTYOFXsv1cM", patternTags:["Queue", "Linked List"] },
        { id:386, name:"Min Stack — getMin() in O(1) Time",      difficulty:"Medium", lc:"https://leetcode.com/problems/min-stack/", gfg:"https://bit.ly/3SVRgPq", yt:"https://youtu.be/V09NfaGCqGY", patternTags:["Stack"] },
        { id:387, name:"Check Redundant Brackets",               difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SVRwbq", yt:"https://youtu.be/wkDfsKijrPI", patternTags:["Stack"] },
      ]},
      { id: "9.2", title: "Prefix, Infix, PostFix Conversion Problems", problems: [
        { id:388, name:"Infix to Postfix Conversion using Stack", difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FgfNji", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
        { id:389, name:"Prefix to Infix Conversion",             difficulty:"Medium", lc:null, gfg:"https://bit.ly/3CSk2Wk", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
        { id:390, name:"Prefix to Postfix Conversion",           difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FgfXxq", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
        { id:391, name:"Postfix to Prefix Conversion",           difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SVS1mq", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
        { id:392, name:"Postfix to Infix Conversion",            difficulty:"Medium", lc:null, gfg:"https://bit.ly/3CSkb0G", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
        { id:393, name:"Convert Infix to Prefix Notation",       difficulty:"Medium", lc:null, gfg:"https://bit.ly/3Fgg6Vt", yt:"https://youtu.be/m4lQNZIYsOQ", patternTags:["Stack"] },
      ]},
      { id: "9.3", title: "Monotonic Stack/Queue Problems [VVV. Imp]", problems: [
        { id:394, name:"Next Greater Element",                   difficulty:"Easy",   lc:"https://leetcode.com/problems/next-greater-element-i/", gfg:"https://bit.ly/3SVSdJP", yt:"https://youtu.be/Class2_C--A", patternTags:["Stack", "Monotonic Stack"] },
        { id:395, name:"Next Greater Element II (Circular Array)",difficulty:"Medium", lc:"https://leetcode.com/problems/next-greater-element-ii/", gfg:"https://bit.ly/3FggKqz", yt:"https://youtu.be/Class2_C--A", patternTags:["Stack", "Monotonic Stack"] },
        { id:396, name:"Next Smaller Element",                   difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3CSkmza", yt:"https://youtu.be/Class2_C--A", patternTags:["Stack", "Monotonic Stack"] },
        { id:397, name:"Number of NGEs to the Right",            difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SVSrJj", yt:"https://youtu.be/Class2_C--A", patternTags:["Stack", "Monotonic Stack"] },
        { id:398, name:"Trapping Rainwater",                     difficulty:"Hard",   lc:"https://leetcode.com/problems/trapping-rain-water/", gfg:"https://bit.ly/3FggVxV", yt:"https://youtu.be/CJ18A6f0wXE", patternTags:["Stack", "Two Pointer"] },
        { id:399, name:"Sum of Subarray Minimums",               difficulty:"Hard",   lc:"https://leetcode.com/problems/sum-of-subarray-minimums/", gfg:"https://bit.ly/3CSl1Yj", yt:"https://youtu.be/aJqkSOnZNiM", patternTags:["Stack", "Monotonic Stack"] },
        { id:400, name:"Asteroid Collision",                     difficulty:"Medium", lc:"https://leetcode.com/problems/asteroid-collision/", gfg:null, yt:"https://youtu.be/E97n9_jXmrI", patternTags:["Stack"] },
        { id:401, name:"Sum of Subarray Ranges",                 difficulty:"Medium", lc:"https://leetcode.com/problems/sum-of-subarray-ranges/", gfg:null, yt:"https://youtu.be/HrlTSrk5W6w", patternTags:["Stack", "Monotonic Stack"] },
        { id:402, name:"Remove K Digits",                        difficulty:"Medium", lc:"https://leetcode.com/problems/remove-k-digits/", gfg:"https://bit.ly/3FghDXr", yt:"https://youtu.be/cQDDtVXFP6M", patternTags:["Stack", "Monotonic Stack", "Greedy"] },
        { id:403, name:"Largest Rectangle in Histogram",         difficulty:"Hard",   lc:"https://leetcode.com/problems/largest-rectangle-in-histogram/", gfg:"https://bit.ly/3SVTV8z", yt:"https://youtu.be/X0X6G-eWyOU", patternTags:["Stack", "Monotonic Stack"] },
        { id:404, name:"Maximal Rectangle in Binary Matrix",     difficulty:"Hard",   lc:"https://leetcode.com/problems/maximal-rectangle/", gfg:"https://bit.ly/3SVU0kP", yt:"https://youtu.be/X0X6G-eWyOU", patternTags:["Stack", "Monotonic Stack", "Matrix"] },
      ]},
      { id: "9.4", title: "Implementation Problems", problems: [
        { id:405, name:"Sliding Window Maximum",                 difficulty:"Hard",   lc:"https://leetcode.com/problems/sliding-window-maximum/", gfg:"https://bit.ly/3SVU3QP", yt:"https://youtu.be/CZQGRp93K4k", patternTags:["Stack", "Sliding Window", "Monotonic Stack"] },
        { id:406, name:"Stock Span Problem",                     difficulty:"Medium", lc:"https://leetcode.com/problems/online-stock-span/", gfg:"https://bit.ly/3SVU3xN", yt:"https://youtu.be/slYh0ZNEqSc", patternTags:["Stack", "Monotonic Stack"] },
        { id:407, name:"The Celebrity Problem",                  difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SVU5oN", yt:"https://youtu.be/-QQu1GIVeLc", patternTags:["Stack"] },
        { id:408, name:"LRU Cache (Implement)",                  difficulty:"Hard",   lc:"https://leetcode.com/problems/lru-cache/", gfg:"https://bit.ly/3FgicXr", yt:"https://youtu.be/RrR_OFCwsCQ", patternTags:["Linked List", "Hashing", "Design"] },
        { id:409, name:"LFU Cache (Implement)",                  difficulty:"Hard",   lc:"https://leetcode.com/problems/lfu-cache/", gfg:null, yt:"https://youtu.be/3vZ4HhfFFt0", patternTags:["Linked List", "Hashing", "Design"] },
      ]},
    ]
};

const TOPIC_SLIDING_WINDOW = {
    stepId: "step10", stepTitle: "Step 10: Sliding Window & Two Pointer Combined Problems", color: "#3FB950",
    subtopics: [
      { id: "10.1", title: "Medium Problems", problems: [
        { id:410, name:"Longest Substring Without Repeating Characters", difficulty:"Medium", lc:"https://leetcode.com/problems/longest-substring-without-repeating-characters/", gfg:"https://bit.ly/3UfXBb1", yt:"https://youtu.be/-zSxTJkcdAo", patternTags:["Sliding Window", "Two Pointer", "Hashing"] },
        { id:411, name:"Max Consecutive Ones III",                  difficulty:"Medium", lc:"https://leetcode.com/problems/max-consecutive-ones-iii/", gfg:"https://bit.ly/3SkO0OV", yt:"https://youtu.be/3E6S6VOyA3Q", patternTags:["Sliding Window", "Two Pointer"] },
        { id:412, name:"Fruit Into Baskets",                        difficulty:"Medium", lc:"https://leetcode.com/problems/fruit-into-baskets/", gfg:null, yt:"https://youtu.be/Gjcec0sppf0", patternTags:["Sliding Window", "Two Pointer", "Hashing"] },
        { id:413, name:"Longest Repeating Character Replacement",   difficulty:"Medium", lc:"https://leetcode.com/problems/longest-repeating-character-replacement/", gfg:null, yt:"https://youtu.be/00wXcDjsmTE", patternTags:["Sliding Window", "Two Pointer"] },
        { id:414, name:"Binary Subarray with Sum",                  difficulty:"Medium", lc:"https://leetcode.com/problems/binary-subarrays-with-sum/", gfg:null, yt:"https://youtu.be/MmDmsuTRwYw", patternTags:["Sliding Window", "Two Pointer"] },
        { id:415, name:"Count Number of Nice Subarrays",            difficulty:"Medium", lc:"https://leetcode.com/problems/count-number-of-nice-subarrays/", gfg:null, yt:"https://youtu.be/MmDmsuTRwYw", patternTags:["Sliding Window", "Two Pointer"] },
        { id:416, name:"Number of Substrings Containing All Three Characters", difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/", gfg:null, yt:"https://youtu.be/xtqN4qlgr8s", patternTags:["Sliding Window", "Two Pointer"] },
        { id:417, name:"Maximum Point You Can Obtain from Cards",   difficulty:"Medium", lc:"https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/", gfg:null, yt:"https://youtu.be/pBWCOCS636U", patternTags:["Sliding Window", "Two Pointer"] },
      ]},
      { id: "10.2", title: "Hard Problems", problems: [
        { id:418, name:"Longest Substring with At Most K Distinct Characters", difficulty:"Hard", lc:null, gfg:"https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1", yt:"https://youtu.be/UnFNoJxn2Pk", patternTags:["Sliding Window", "Two Pointer", "Hashing"] },
        { id:419, name:"Subarray with K Different Integers",        difficulty:"Hard",   lc:"https://leetcode.com/problems/subarrays-with-k-different-integers/", gfg:null, yt:"https://youtu.be/lkmRJqq9Q5o", patternTags:["Sliding Window", "Two Pointer", "Hashing"] },
        { id:420, name:"Minimum Window Substring",                  difficulty:"Hard",   lc:"https://leetcode.com/problems/minimum-window-substring/", gfg:"https://bit.ly/3FghQa4", yt:"https://youtu.be/qK6mp2_dV9c", patternTags:["Sliding Window", "Two Pointer", "Hashing"] },
        { id:421, name:"Minimum Window Subsequence",                difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/minimum-window-subsequence/1", yt:"https://youtu.be/-7nx99cFge0", patternTags:["Sliding Window", "Two Pointer", "DP"] },
      ]},
    ]
};

const TOPIC_HEAPS = {
    stepId: "step11", stepTitle: "Step 11: Heaps [Learning, Medium, Hard Problems]", color: "#F472B6",
    subtopics: [
      { id: "11.1", title: "Learning", problems: [
        { id:430, name:"Introduction to Priority Queues using Binary Heaps", difficulty:"Easy", lc:null, gfg:"https://bit.ly/3UvY7ML", yt:"https://youtu.be/HqPJF2L5h9U", patternTags:["Heap"] },
        { id:431, name:"Min Heap and Max Heap Implementation",        difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3SY3xCQ", yt:"https://youtu.be/HqPJF2L5h9U", patternTags:["Heap"] },
        { id:432, name:"Check if an Array Represents a Min-Heap",    difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3Cz2P7m", yt:"https://youtu.be/HqPJF2L5h9U", patternTags:["Heap"] },
        { id:433, name:"Convert Min Heap to Max Heap",                difficulty:"Medium", lc:null, gfg:"https://bit.ly/3T0rJpV", yt:"https://youtu.be/HqPJF2L5h9U", patternTags:["Heap"] },
      ]},
      { id: "11.2", title: "Medium Problems", problems: [
        { id:434, name:"Kth Largest Element in an Array",             difficulty:"Medium", lc:"https://leetcode.com/problems/kth-largest-element-in-an-array/", gfg:"https://bit.ly/3rzbJ0K", yt:"https://youtu.be/0NSEdkdK6cQ", patternTags:["Heap"] },
        { id:435, name:"Kth Smallest Element in an Array",            difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SYqLCi", yt:"https://youtu.be/0NSEdkdK6cQ", patternTags:["Heap"] },
        { id:436, name:"Sort a K Sorted or Nearly Sorted Array",     difficulty:"Medium", lc:null, gfg:"https://bit.ly/3F0jzGz", yt:"https://youtu.be/0NSEdkdK6cQ", patternTags:["Heap"] },
        { id:437, name:"K Closest Points to Origin",                  difficulty:"Medium", lc:"https://leetcode.com/problems/k-closest-points-to-origin/", gfg:null, yt:"https://youtu.be/0NSEdkdK6cQ", patternTags:["Heap"] },
        { id:438, name:"Top K Frequent Elements",                     difficulty:"Medium", lc:"https://leetcode.com/problems/top-k-frequent-elements/", gfg:"https://bit.ly/3T1Z2pR", yt:"https://youtu.be/YPTqKIgVk-k", patternTags:["Heap", "Hashing"] },
        { id:439, name:"Task Scheduler",                              difficulty:"Medium", lc:"https://leetcode.com/problems/task-scheduler/", gfg:null, yt:"https://youtu.be/s8p8ukTyceI", patternTags:["Heap", "Greedy"] },
        { id:440, name:"Hands of Straights",                          difficulty:"Medium", lc:"https://leetcode.com/problems/hand-of-straights/", gfg:null, yt:"https://youtu.be/0kPPpYwr1f8", patternTags:["Heap", "Greedy"] },
      ]},
      { id: "11.3", title: "Hard Problems", problems: [
        { id:441, name:"Design Twitter",                              difficulty:"Hard",   lc:"https://leetcode.com/problems/design-twitter/", gfg:null, yt:"https://youtu.be/qz9tKlF431k", patternTags:["Heap", "Design"] },
        { id:442, name:"Connect N Ropes with Minimum Cost",           difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3SXrZ7M", yt:"https://youtu.be/Nz7H2bdf3wU", patternTags:["Heap", "Greedy"] },
        { id:443, name:"Kth Largest Element in a Stream",             difficulty:"Medium", lc:"https://leetcode.com/problems/kth-largest-element-in-a-stream/", gfg:"https://bit.ly/3rA3aJh", yt:"https://youtu.be/hOjcdrqMoQ8", patternTags:["Heap"] },
        { id:444, name:"Maximum Sum Combination",                     difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3SXsd3J", yt:"https://youtu.be/0Vc1V6sH7DI", patternTags:["Heap"] },
        { id:445, name:"Find Median from Data Stream",                difficulty:"Hard",   lc:"https://leetcode.com/problems/find-median-from-data-stream/", gfg:"https://bit.ly/3FagY7N", yt:"https://youtu.be/itmhHWaHupI", patternTags:["Heap", "Design"] },
        { id:446, name:"Distinct Numbers in Window",                  difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/distinct-numbers-in-window/1", yt:"https://youtu.be/YPTqKIgVk-k", patternTags:["Heap", "Sliding Window", "Hashing"] },
        { id:4461, name:"Kth Largest Sum Contiguous Subarray",        difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/k-th-largest-sum-contiguous-subarray/1", yt:"https://youtu.be/YPTqKIgVk-k", patternTags:["Heap"] },
      ]},
    ]
};

const TOPIC_GREEDY = {
    stepId: "step12", stepTitle: "Step 12: Greedy Algorithms [Easy, Medium/Hard]", color: "#FACC15",
    subtopics: [
      { id: "12.1", title: "Easy Problems", problems: [
        { id:447, name:"Assign Cookies",                              difficulty:"Easy",   lc:"https://leetcode.com/problems/assign-cookies/", gfg:null, yt:"https://youtu.be/DIX2p7vb9co", patternTags:["Greedy"] },
        { id:448, name:"Fractional Knapsack Problem",                 difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3FaW7n3", yt:"https://youtu.be/DIX2p7vb9co", patternTags:["Greedy"] },
        { id:449, name:"Greedy Algorithm to Find Minimum Number of Coins", difficulty:"Easy", lc:null, gfg:"https://bit.ly/3T2bN0u", yt:"https://youtu.be/DIX2p7vb9co", patternTags:["Greedy"] },
        { id:450, name:"Lemonade Change",                             difficulty:"Easy",   lc:"https://leetcode.com/problems/lemonade-change/", gfg:null, yt:"https://youtu.be/DIX2p7vb9co", patternTags:["Greedy"] },
      ]},
      { id: "12.2", title: "Medium/Hard", problems: [
        { id:451, name:"Valid Paranthesis String",                    difficulty:"Medium", lc:"https://leetcode.com/problems/valid-parenthesis-string/", gfg:null, yt:"https://youtu.be/cMpCpYwYqEY", patternTags:["Greedy", "Stack"] },
        { id:452, name:"N Meetings in One Room",                      difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SY8uIA", yt:"https://youtu.be/ZIu5h0AmI3I", patternTags:["Greedy", "Sorting"] },
        { id:453, name:"Jump Game",                                   difficulty:"Medium", lc:"https://leetcode.com/problems/jump-game/", gfg:"https://bit.ly/3T2c8sM", yt:"https://youtu.be/M5VbZBmJiUo", patternTags:["Greedy"] },
        { id:454, name:"Jump Game II",                                difficulty:"Medium", lc:"https://leetcode.com/problems/jump-game-ii/", gfg:null, yt:"https://youtu.be/7SBmla0fXR4", patternTags:["Greedy"] },
        { id:455, name:"Minimum Number of Platforms Required for a Railway", difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SXtNqz", yt:"https://youtu.be/RapEPQs7Ds4", patternTags:["Greedy", "Sorting"] },
        { id:456, name:"Job Sequencing Problem",                      difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FbeRjE", yt:"https://youtu.be/eY9MQqIH3so", patternTags:["Greedy", "Sorting"] },
        { id:457, name:"Candy",                                       difficulty:"Hard",   lc:"https://leetcode.com/problems/candy/", gfg:null, yt:"https://youtu.be/3T_NbjAVwq8", patternTags:["Greedy"] },
        { id:458, name:"Shortest Job First",                          difficulty:"Medium", lc:null, gfg:"https://bit.ly/3T2dG7e", yt:"https://youtu.be/dyQ4SoYiSQg", patternTags:["Greedy", "Sorting"] },
        { id:4581, name:"LRU Page Replacement Algorithm",             difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/page-faults-in-lru5603/1", yt:"https://youtu.be/OWjzMQHGjPE", patternTags:["Greedy"] },
        { id:459, name:"Insert Interval",                             difficulty:"Medium", lc:"https://leetcode.com/problems/insert-interval/", gfg:null, yt:"https://youtu.be/ZBz5fjEcaa8", patternTags:["Greedy", "Intervals"] },
        { id:460, name:"Merge Non-overlapping Intervals",             difficulty:"Medium", lc:"https://leetcode.com/problems/merge-intervals/", gfg:"https://bit.ly/3w40Xzc", yt:"https://youtu.be/IexN60k62jo", patternTags:["Greedy", "Sorting", "Intervals"] },
        { id:461, name:"Non-overlapping Intervals",                   difficulty:"Medium", lc:"https://leetcode.com/problems/non-overlapping-intervals/", gfg:null, yt:"https://youtu.be/nONCGxWoUfM", patternTags:["Greedy", "Sorting", "Intervals"] },
      ]},
    ]
};

const TOPIC_BINARY_TREES = {
    stepId: "step13", stepTitle: "Step 13: Binary Trees [Traversals, Medium and Hard Problems]", color: "#60A5FA",
    subtopics: [
      { id: "13.1", title: "Traversals", problems: [
        { id:470, name:"Introduction to Trees",                       difficulty:"Easy",   lc:null, gfg:"https://bit.ly/3T2eVxN", yt:"https://youtu.be/_ANrF3FJm70", patternTags:["Tree"] },
        { id:471, name:"Preorder Traversal of Binary Tree",           difficulty:"Easy",   lc:"https://leetcode.com/problems/binary-tree-preorder-traversal/", gfg:"https://bit.ly/3T2fA1m", yt:"https://youtu.be/_yVcARGmKHs", patternTags:["Tree", "DFS"] },
        { id:472, name:"Inorder Traversal of Binary Tree",            difficulty:"Easy",   lc:"https://leetcode.com/problems/binary-tree-inorder-traversal/", gfg:"https://bit.ly/3rDz4mC", yt:"https://youtu.be/_yVcARGmKHs", patternTags:["Tree", "DFS"] },
        { id:473, name:"Postorder Traversal of Binary Tree",          difficulty:"Easy",   lc:"https://leetcode.com/problems/binary-tree-postorder-traversal/", gfg:"https://bit.ly/3T2gJZx", yt:"https://youtu.be/_yVcARGmKHs", patternTags:["Tree", "DFS"] },
        { id:474, name:"Morris Traversal — Preorder and Inorder",     difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3FbgX0o", yt:"https://youtu.be/F5b7DnT-_-A", patternTags:["Tree", "DFS"] },
        { id:475, name:"Level Order Traversal / Binary Tree BFS",     difficulty:"Medium", lc:"https://leetcode.com/problems/binary-tree-level-order-traversal/", gfg:"https://bit.ly/3SY9TGT", yt:"https://youtu.be/EoJ2dxJgPmM", patternTags:["Tree", "BFS"] },
        { id:476, name:"Iterative Preorder Traversal",                difficulty:"Medium", lc:"https://leetcode.com/problems/binary-tree-preorder-traversal/", gfg:"https://bit.ly/3T2fA1m", yt:"https://youtu.be/jfWTGqNBwYY", patternTags:["Tree", "DFS", "Stack"] },
        { id:477, name:"Iterative Inorder Traversal",                 difficulty:"Medium", lc:"https://leetcode.com/problems/binary-tree-inorder-traversal/", gfg:"https://bit.ly/3rDz4mC", yt:"https://youtu.be/4VqkWtsT0OQ", patternTags:["Tree", "DFS", "Stack"] },
        { id:478, name:"Iterative Postorder Traversal Using 2 Stacks",difficulty:"Medium", lc:"https://leetcode.com/problems/binary-tree-postorder-traversal/", gfg:"https://bit.ly/3T2gJZx", yt:"https://youtu.be/Df9GnNHkLwY", patternTags:["Tree", "DFS", "Stack"] },
        { id:479, name:"Postorder Traversal Using 1 Stack",           difficulty:"Hard",   lc:"https://leetcode.com/problems/binary-tree-postorder-traversal/", gfg:"https://bit.ly/3T2gJZx", yt:"https://youtu.be/QhszUQhGGlA", patternTags:["Tree", "DFS", "Stack"] },
        { id:480, name:"Preorder, Inorder, Postorder in a Single Traversal", difficulty:"Hard", lc:null, gfg:"https://bit.ly/3Fc4QbF", yt:"https://youtu.be/asWro14MR8c", patternTags:["Tree", "DFS", "Stack"] },
        { id:506, name:"Morris Traversal — Postorder",                difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3FbgX0o", yt:"https://youtu.be/sWf7k1x9XR4", patternTags:["Tree", "DFS"] },
      ]},
      { id: "13.2", title: "Medium Problems", problems: [
        { id:481, name:"Height of a Binary Tree",                     difficulty:"Easy",   lc:"https://leetcode.com/problems/maximum-depth-of-binary-tree/", gfg:"https://bit.ly/3T2hVOu", yt:"https://youtu.be/eD3tmO66aBA", patternTags:["Tree", "DFS"] },
        { id:482, name:"Check if Binary Tree is Height-Balanced",     difficulty:"Medium", lc:"https://leetcode.com/problems/balanced-binary-tree/", gfg:"https://bit.ly/3rDA8VJ", yt:"https://youtu.be/Yt50Jfbd8Po", patternTags:["Tree", "DFS"] },
        { id:483, name:"Diameter of Binary Tree",                     difficulty:"Medium", lc:"https://leetcode.com/problems/diameter-of-binary-tree/", gfg:"https://bit.ly/3SZaJZx", yt:"https://youtu.be/Rezetez59Nk", patternTags:["Tree", "DFS"] },
        { id:484, name:"Maximum Path Sum",                            difficulty:"Hard",   lc:"https://leetcode.com/problems/binary-tree-maximum-path-sum/", gfg:"https://bit.ly/3T2iD5O", yt:"https://youtu.be/WszrfSwMz58", patternTags:["Tree", "DFS"] },
        { id:485, name:"Check if Two Trees are Identical",            difficulty:"Easy",   lc:"https://leetcode.com/problems/same-tree/", gfg:"https://bit.ly/3rDAW2c", yt:"https://youtu.be/BhuvF_-PWS0", patternTags:["Tree", "DFS"] },
        { id:486, name:"Zig Zag Traversal of Binary Tree",            difficulty:"Medium", lc:"https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", gfg:"https://bit.ly/3FcK1AS", yt:"https://youtu.be/JJgwbMtFji0", patternTags:["Tree", "BFS"] },
        { id:487, name:"Boundary Traversal of Binary Tree",           difficulty:"Medium", lc:null, gfg:"https://bit.ly/3T2jVCo", yt:"https://youtu.be/0ca1nvR0be4", patternTags:["Tree", "DFS"] },
        { id:488, name:"Vertical Order Traversal of Binary Tree",     difficulty:"Hard",   lc:"https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/", gfg:"https://bit.ly/3rDBdNK", yt:"https://youtu.be/HE2lpJSp2KE", patternTags:["Tree", "BFS"] },
        { id:489, name:"Top View of Binary Tree",                     difficulty:"Medium", lc:null, gfg:"https://bit.ly/3T2k3eW", yt:"https://youtu.be/KSsk8AhdLZw", patternTags:["Tree", "BFS"] },
        { id:490, name:"Bottom View of Binary Tree",                  difficulty:"Medium", lc:null, gfg:"https://bit.ly/3FcL9Ar", yt:"https://youtu.be/KSsk8AhdLZw", patternTags:["Tree", "BFS"] },
        { id:491, name:"Right/Left View of Binary Tree",              difficulty:"Easy",   lc:"https://leetcode.com/problems/binary-tree-right-side-view/", gfg:"https://bit.ly/3rDBPfA", yt:"https://youtu.be/KKL_GU2bP_M", patternTags:["Tree", "DFS", "BFS"] },
        { id:492, name:"Check for Symmetrical Binary Tree",           difficulty:"Medium", lc:"https://leetcode.com/problems/symmetric-tree/", gfg:"https://bit.ly/3T2lEho", yt:"https://youtu.be/9QvznsuoYUo", patternTags:["Tree", "DFS"] },
      ]},
      { id: "13.3", title: "Hard Problems", problems: [
        { id:493, name:"Root to Node Path in Binary Tree",            difficulty:"Medium", lc:null, gfg:"https://bit.ly/3SZbpBR", yt:"https://youtu.be/iWcbtuoUaUg", patternTags:["Tree", "DFS"] },
        { id:494, name:"LCA in Binary Tree",                          difficulty:"Medium", lc:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", gfg:"https://bit.ly/3T2m9fA", yt:"https://youtu.be/_-QHfMDde90", patternTags:["Tree", "DFS"] },
        { id:495, name:"Maximum Width of Binary Tree",                difficulty:"Medium", lc:"https://leetcode.com/problems/maximum-width-of-binary-tree/", gfg:"https://bit.ly/3rDCSU2", yt:"https://youtu.be/4yzAYTSh4UA", patternTags:["Tree", "BFS"] },
        { id:496, name:"Children Sum Property in Binary Tree",        difficulty:"Medium", lc:null, gfg:"https://bit.ly/3T2nJxq", yt:"https://youtu.be/dKbhdSAprQ8", patternTags:["Tree", "DFS"] },
        { id:497, name:"Print All the Nodes at a Distance of K in Binary Tree", difficulty:"Hard", lc:"https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/", gfg:"https://bit.ly/3FcN1ZL", yt:"https://youtu.be/Vt5lvyqlBhY", patternTags:["Tree", "BFS", "DFS"] },
        { id:498, name:"Minimum Time Taken to BURN the Binary Tree",  difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3SZeJYz", yt:"https://youtu.be/_RVpaJgZ51Q", patternTags:["Tree", "BFS"] },
        { id:499, name:"Count Total Nodes in a Complete Binary Tree", difficulty:"Medium", lc:"https://leetcode.com/problems/count-complete-tree-nodes/", gfg:"https://bit.ly/3rDDEnQ", yt:"https://youtu.be/9NaR0BC2lJI", patternTags:["Tree", "Binary Search"] },
        { id:500, name:"Requirements Needed to Construct a Unique Binary Tree", difficulty:"Hard", lc:null, gfg:"https://bit.ly/3T2oMpJ", yt:"https://youtu.be/3eIBASGcGiQ", patternTags:["Tree"] },
        { id:501, name:"Construct Binary Tree from Preorder and Inorder", difficulty:"Hard", lc:"https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", gfg:"https://bit.ly/3FcOJxN", yt:"https://youtu.be/aZNaLrVebKQ", patternTags:["Tree", "DFS"] },
        { id:502, name:"Construct Binary Tree from Postorder and Inorder", difficulty:"Hard", lc:"https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/", gfg:"https://bit.ly/3rDEzGN", yt:"https://youtu.be/LgLRTaEMRVc", patternTags:["Tree", "DFS"] },
        { id:503, name:"Serialize and Deserialize a Binary Tree",     difficulty:"Hard",   lc:"https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", gfg:"https://bit.ly/3T2pXqV", yt:"https://youtu.be/u4JAi2JJhI8", patternTags:["Tree", "BFS"] },
        { id:504, name:"Morris Inorder Traversal",                    difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3FbgX0o", yt:"https://youtu.be/F5b7DnT-_-A", patternTags:["Tree", "DFS"] },
        { id:505, name:"Flatten Binary Tree to Linked List",          difficulty:"Hard",   lc:"https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", gfg:"https://bit.ly/3rDFy0R", yt:"https://youtu.be/sWf7k1x9XR4", patternTags:["Tree", "DFS", "Linked List"] },
        { id:507, name:"Diagonal Traversal of Binary Tree",           difficulty:"Hard",   lc:null, gfg:"https://bit.ly/3T2qXqR", yt:"https://youtu.be/W3WiH3SUMs8", patternTags:["Tree", "BFS"] },
      ]},
    ]
};

const TOPIC_BST = {
  stepId: "step14", stepTitle: "Step 14: Binary Search Trees [Concept and Problems]", color: "#34D399",
  subtopics: [
    { id: "14.1", title: "Concepts", problems: [
      { id:600, name:"Introduction to BST",                            difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/binary-search-tree-data-structure/", yt:"https://youtu.be/p7-9UvDQZ3w", patternTags:["BST","Tree"] },
      { id:601, name:"Search in a BST",                                difficulty:"Easy",   lc:"https://leetcode.com/problems/search-in-a-binary-search-tree/", gfg:"https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/", yt:"https://youtu.be/KcNt6v_56cc", patternTags:["BST","Tree"] },
      { id:602, name:"Find Min/Max in BST",                            difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/find-the-minimum-element-in-a-binary-search-tree/", yt:"https://youtu.be/p7-9UvDQZ3w", patternTags:["BST","Tree"] },
    ]},
    { id: "14.2", title: "Practice Problems", problems: [
      { id:603, name:"Ceil in a BST",                                  difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/implementing-ceil-in-bst/1", yt:"https://youtu.be/KSsk8AhdLZw", patternTags:["BST","Tree"] },
      { id:604, name:"Floor in a BST",                                 difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/floor-in-binary-search-tree-bst/", yt:"https://youtu.be/xm_W1ub-K-w", patternTags:["BST","Tree"] },
      { id:605, name:"Insert into a BST",                              difficulty:"Medium", lc:"https://leetcode.com/problems/insert-into-a-binary-search-tree/", gfg:"https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/", yt:"https://youtu.be/FiFiNvM29ps", patternTags:["BST","Tree"] },
      { id:606, name:"Delete Node in a BST",                           difficulty:"Medium", lc:"https://leetcode.com/problems/delete-node-in-a-bst/", gfg:"https://www.geeksforgeeks.org/binary-search-tree-set-2-delete/", yt:"https://youtu.be/kouxiP_H5WE", patternTags:["BST","Tree"] },
      { id:607, name:"Kth Smallest Element in a BST",                  difficulty:"Medium", lc:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/", gfg:"https://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst-order-statistics-in-bst/", yt:"https://youtu.be/9TJYWh0adfk", patternTags:["BST","Tree","DFS"] },
      { id:608, name:"Kth Largest Element in a BST",                   difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/kth-largest-element-in-bst-when-modification-to-bst-is-not-allowed/", yt:"https://youtu.be/9TJYWh0adfk", patternTags:["BST","Tree","DFS"] },
      { id:609, name:"Validate Binary Search Tree",                    difficulty:"Medium", lc:"https://leetcode.com/problems/validate-binary-search-tree/", gfg:"https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/", yt:"https://youtu.be/f-sj7I5oXEI", patternTags:["BST","Tree","DFS"] },
      { id:610, name:"LCA in BST",                                     difficulty:"Medium", lc:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", gfg:"https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/", yt:"https://youtu.be/cX_kPV_foZc", patternTags:["BST","Tree"] },
      { id:611, name:"Construct BST from Preorder Traversal",          difficulty:"Medium", lc:"https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/", gfg:"https://www.geeksforgeeks.org/construct-bst-from-given-preorder-traversal/", yt:"https://youtu.be/UmJT3j26t1I", patternTags:["BST","Tree"] },
      { id:612, name:"Inorder Successor and Predecessor in BST",       difficulty:"Medium", lc:"https://leetcode.com/problems/inorder-successor-in-bst/", gfg:"https://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/", yt:"https://youtu.be/SXKAD2svfmI", patternTags:["BST","Tree"] },
      { id:6121, name:"Merge Two BSTs",                                difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/merge-two-bst-s/1", yt:"https://youtu.be/s6ATEkipzow", patternTags:["BST","Tree","DFS"] },
      { id:613, name:"BST Iterator",                                   difficulty:"Medium", lc:"https://leetcode.com/problems/binary-search-tree-iterator/", gfg:"https://www.geeksforgeeks.org/implement-binary-search-treebst-iterator/", yt:"https://youtu.be/D2jMcmxU4bs", patternTags:["BST","Tree","Design"] },
      { id:614, name:"Two Sum in BST",                                 difficulty:"Easy",   lc:"https://leetcode.com/problems/two-sum-iv-input-is-a-bst/", gfg:"https://www.geeksforgeeks.org/find-a-pair-with-given-sum-in-bst/", yt:"https://youtu.be/ssL3sHwPeb4", patternTags:["BST","Tree","Two Pointer"] },
      { id:615, name:"Recover BST (Correct the BST)",                  difficulty:"Hard",   lc:"https://leetcode.com/problems/recover-binary-search-tree/", gfg:"https://www.geeksforgeeks.org/fix-two-swapped-nodes-of-bst/", yt:"https://youtu.be/ZWGW7FminDM", patternTags:["BST","Tree","DFS"] },
      { id:616, name:"Largest BST in Binary Tree",                     difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/find-the-largest-subtree-in-a-tree-that-is-also-a-bst/", yt:"https://youtu.be/X0oXMdtUDwo", patternTags:["BST","Tree","DP"] },
    ]},
  ]
};

const TOPIC_GRAPHS = {
  stepId: "step15", stepTitle: "Step 15: Graphs [Concepts & Problems]", color: "#F97316",
  subtopics: [
    { id: "15.1", title: "Learning", problems: [
      { id:620, name:"Graph and Types",                                difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/", yt:"https://youtu.be/M3_pLsDdeuU", patternTags:["Graph"] },
      { id:621, name:"Graph Representation — C++",                   difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/graph-and-its-representations/", yt:"https://youtu.be/3oI-34aPMWM", patternTags:["Graph"] },
      { id:6211, name:"Graph Representation — Java",                 difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/graph-and-its-representations/", yt:"https://youtu.be/3oI-34aPMWM", patternTags:["Graph"] },
      { id:622, name:"Connected Components",                          difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/connected-components-in-an-undirected-graph/", yt:"https://youtu.be/sV7bXpU5o9k", patternTags:["Graph","BFS","DFS"] },
      { id:623, name:"BFS (Breadth First Search)",                    difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/", yt:"https://youtu.be/-tgVpUgsQ5k", patternTags:["Graph","BFS"] },
      { id:624, name:"DFS (Depth First Search)",                      difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/", yt:"https://youtu.be/Qzf1a--rhp8", patternTags:["Graph","DFS"] },
    ]},
    { id: "15.2", title: "Problems on BFS/DFS", problems: [
      { id:625, name:"Number of Provinces",                           difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-provinces/", gfg:"https://www.geeksforgeeks.org/find-the-number-of-provinces/", yt:"https://youtu.be/0btP7bWWp0E", patternTags:["Graph","DFS","Union Find"] },
      { id:626, name:"Number of Islands",                             difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-islands/", gfg:"https://www.geeksforgeeks.org/find-the-number-of-islands/", yt:"https://youtu.be/sV7bXpU5o9k", patternTags:["Graph","BFS","DFS"] },
      { id:627, name:"Rotten Oranges",                                difficulty:"Medium", lc:"https://leetcode.com/problems/rotting-oranges/", gfg:"https://www.geeksforgeeks.org/minimum-time-required-so-that-all-oranges-become-rotten/", yt:"https://youtu.be/yf3oUhkvB8o", patternTags:["Graph","BFS"] },
      { id:628, name:"Flood Fill",                                    difficulty:"Easy",   lc:"https://leetcode.com/problems/flood-fill/", gfg:"https://www.geeksforgeeks.org/flood-fill-algorithm-implement-fill-paint/", yt:"https://youtu.be/C-2_uSRli8o", patternTags:["Graph","BFS","DFS"] },
      { id:629, name:"Cycle Detection in Undirected Graph (BFS)",     difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/detect-cycle-undirected-graph/", yt:"https://youtu.be/A8ko93TyOns", patternTags:["Graph","BFS"] },
      { id:630, name:"Cycle Detection in Undirected Graph (DFS)",     difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/detect-cycle-undirected-graph/", yt:"https://youtu.be/zQ3zgFypzX4", patternTags:["Graph","DFS"] },
      { id:631, name:"0/1 Matrix",                                    difficulty:"Medium", lc:"https://leetcode.com/problems/01-matrix/", gfg:"https://www.geeksforgeeks.org/shortest-distance-from-a-source-cell-to-all-other-cells-of-a-matrix/", yt:"https://youtu.be/edXdVlkYA-4", patternTags:["Graph","BFS"] },
      { id:632, name:"Surrounded Regions",                            difficulty:"Medium", lc:"https://leetcode.com/problems/surrounded-regions/", gfg:"https://www.geeksforgeeks.org/given-matrix-o-x-replace-o-x-surrounded-x/", yt:"https://youtu.be/BtdgAys4yMk", patternTags:["Graph","BFS","DFS"] },
      { id:633, name:"Number of Enclaves",                            difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-enclaves/", gfg:"https://www.geeksforgeeks.org/count-cells-in-a-grid-from-which-entire-grid-cannot-be-visited/", yt:"https://youtu.be/rxKcepXQgU4", patternTags:["Graph","BFS","DFS"] },
      { id:634, name:"Word Ladder I",                                 difficulty:"Hard",   lc:"https://leetcode.com/problems/word-ladder/", gfg:"https://www.geeksforgeeks.org/word-ladder-length-of-shortest-chain-to-reach-a-target-word/", yt:"https://youtu.be/tRPda0rcf8E", patternTags:["Graph","BFS"] },
      { id:635, name:"Word Ladder II",                                difficulty:"Hard",   lc:"https://leetcode.com/problems/word-ladder-ii/", gfg:"https://www.geeksforgeeks.org/word-ladder-set-2complete-solution/", yt:"https://youtu.be/DREutrv2XD0", patternTags:["Graph","BFS"] },
      { id:636, name:"Number of Distinct Islands",                    difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/number-distinct-islands/", yt:"https://youtu.be/7zmgQSJghpo", patternTags:["Graph","DFS","Hashing"] },
      { id:637, name:"Bipartite Graph (BFS)",                         difficulty:"Medium", lc:"https://leetcode.com/problems/is-graph-bipartite/", gfg:"https://www.geeksforgeeks.org/bipartite-graph/", yt:"https://youtu.be/-vu34sct1g8", patternTags:["Graph","BFS"] },
      { id:638, name:"Bipartite Graph (DFS)",                         difficulty:"Medium", lc:"https://leetcode.com/problems/is-graph-bipartite/", gfg:"https://www.geeksforgeeks.org/bipartite-graph/", yt:"https://youtu.be/KG5YFfR0j8A", patternTags:["Graph","DFS"] },
    ]},
    { id: "15.3", title: "Topo Sort and Problems", problems: [
      { id:639, name:"Topological Sort (DFS)",                        difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/topological-sorting/", yt:"https://youtu.be/5lZ0iJMrUMk", patternTags:["Graph","DFS","Topological Sort"] },
      { id:640, name:"Topological Sort (BFS — Kahn's Algo)",         difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/", yt:"https://youtu.be/73sneFXuTEg", patternTags:["Graph","BFS","Topological Sort"] },
      { id:641, name:"Cycle Detection in Directed Graph (BFS)",       difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/detect-cycle-in-a-directed-graph-using-bfs/", yt:"https://youtu.be/iTBaI90lpDQ", patternTags:["Graph","BFS","Topological Sort"] },
      { id:642, name:"Cycle Detection in Directed Graph (DFS)",       difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/detect-cycle-in-a-graph/", yt:"https://youtu.be/9twcmtQj4DU", patternTags:["Graph","DFS"] },
      { id:643, name:"Course Schedule I",                             difficulty:"Medium", lc:"https://leetcode.com/problems/course-schedule/", gfg:"https://www.geeksforgeeks.org/find-whether-it-is-possible-to-finish-all-tasks-or-not-from-given-dependencies/", yt:"https://youtu.be/WAOfKpxYHR8", patternTags:["Graph","BFS","Topological Sort"] },
      { id:644, name:"Course Schedule II",                            difficulty:"Medium", lc:"https://leetcode.com/problems/course-schedule-ii/", gfg:"https://www.geeksforgeeks.org/find-the-ordering-of-tasks-from-given-dependencies/", yt:"https://youtu.be/qe_pQCh09yU", patternTags:["Graph","BFS","Topological Sort"] },
      { id:645, name:"Find Eventual Safe States",                     difficulty:"Medium", lc:"https://leetcode.com/problems/find-eventual-safe-states/", gfg:"https://www.geeksforgeeks.org/find-eventual-safe-states-in-a-directed-graph/", yt:"https://youtu.be/uRbJ1OF9aYM", patternTags:["Graph","DFS","Topological Sort"] },
      { id:646, name:"Alien Dictionary",                              difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/", yt:"https://youtu.be/U3N_je7tWAs", patternTags:["Graph","BFS","Topological Sort"] },
    ]},
    { id: "15.4", title: "Shortest Path Algorithms", problems: [
      { id:647, name:"Shortest Path in Undirected Graph (Unit Weights)", difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/shortest-path-unweighted-graph/", yt:"https://youtu.be/C4gxoTaI71U", patternTags:["Graph","BFS"] },
      { id:648, name:"Shortest Path in DAG",                          difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/shortest-path-for-directed-acyclic-graphs/", yt:"https://youtu.be/ZUFQfFaU-8U", patternTags:["Graph","Topological Sort"] },
      { id:649, name:"Dijkstra's Algorithm (Priority Queue)",         difficulty:"Medium", lc:"https://leetcode.com/problems/network-delay-time/", gfg:"https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/", yt:"https://youtu.be/V6H1qAeB-l4", patternTags:["Graph","Dijkstra","Heap"] },
      { id:650, name:"Dijkstra's Algorithm (Set)",                    difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-using-set-in-stl/", yt:"https://youtu.be/PATgNiyd2n0", patternTags:["Graph","Dijkstra"] },
      { id:651, name:"Bellman Ford Algorithm",                        difficulty:"Medium", lc:"https://leetcode.com/problems/network-delay-time/", gfg:"https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/", yt:"https://youtu.be/0vVofAhAYjc", patternTags:["Graph","Bellman Ford"] },
      { id:652, name:"Floyd Warshall Algorithm",                      difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/", yt:"https://youtu.be/YbY8cVwWAvw", patternTags:["Graph","Floyd Warshall"] },
      { id:653, name:"City With the Smallest Number of Neighbors",    difficulty:"Medium", lc:"https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/", gfg:"https://www.geeksforgeeks.org/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/", yt:"https://youtu.be/PwMVNSJ5SLI", patternTags:["Graph","Floyd Warshall"] },
      { id:654, name:"Path With Minimum Effort",                      difficulty:"Medium", lc:"https://leetcode.com/problems/path-with-minimum-effort/", gfg:"https://www.geeksforgeeks.org/path-with-minimum-effort/", yt:"https://youtu.be/0ytpZyiZFhA", patternTags:["Graph","Dijkstra","Binary Search"] },
      { id:655, name:"Cheapest Flights Within K Stops",               difficulty:"Medium", lc:"https://leetcode.com/problems/cheapest-flights-within-k-stops/", gfg:"https://www.geeksforgeeks.org/find-the-cheapest-flights-within-k-stops/", yt:"https://youtu.be/9XybHVqTHcQ", patternTags:["Graph","Bellman Ford","BFS"] },
      { id:656, name:"Minimum Multiplications to Reach End",          difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/minimum-multiplications-to-reach-end/", yt:"https://youtu.be/_BvEJ3VIDWw", patternTags:["Graph","BFS"] },
      { id:657, name:"Number of Ways to Arrive at Destination",       difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/", gfg:"https://www.geeksforgeeks.org/number-of-ways-to-arrive-at-destination/", yt:"https://youtu.be/_-0mx0SmYxA", patternTags:["Graph","Dijkstra"] },
    ]},
    { id: "15.5", title: "MST / Disjoint Set Union", problems: [
      { id:658, name:"Minimum Spanning Tree (Prim's Algorithm)",      difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/", yt:"https://youtu.be/mJcZjjKzeqk", patternTags:["Graph","MST","Heap"] },
      { id:659, name:"Disjoint Set (Union-Find)",                     difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/union-find/", yt:"https://youtu.be/aBxjDBC4M1U", patternTags:["Graph","Union Find"] },
      { id:660, name:"Kruskal's Algorithm",                           difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/", yt:"https://youtu.be/DMnDM_sxVig", patternTags:["Graph","MST","Union Find"] },
      { id:661, name:"Number of Operations to Make Network Connected",difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-operations-to-make-network-connected/", gfg:"https://www.geeksforgeeks.org/minimize-the-number-of-weakly-connected-nodes/", yt:"https://youtu.be/FYrl7iz9_ZU", patternTags:["Graph","Union Find"] },
      { id:662, name:"Most Stones Removed with Same Row or Column",   difficulty:"Medium", lc:"https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/", gfg:"https://www.geeksforgeeks.org/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/1", yt:"https://youtu.be/OwMNX8SPavM", patternTags:["Graph","Union Find"] },
      { id:663, name:"Accounts Merge",                                difficulty:"Medium", lc:"https://leetcode.com/problems/accounts-merge/", gfg:"https://www.geeksforgeeks.org/accounts-merge/", yt:"https://youtu.be/FMwpt_aQOGw", patternTags:["Graph","Union Find"] },
      { id:664, name:"Number of Islands II",                          difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/problems/number-of-islands/1", yt:"https://youtu.be/Rn6B-Q4SNyA", patternTags:["Graph","Union Find"] },
      { id:665, name:"Making a Large Island",                         difficulty:"Hard",   lc:"https://leetcode.com/problems/making-a-large-island/", gfg:"https://www.geeksforgeeks.org/making-large-island/", yt:"https://youtu.be/lgiz9H56yfM", patternTags:["Graph","Union Find"] },
      { id:666, name:"Swim in Rising Water",                          difficulty:"Hard",   lc:"https://leetcode.com/problems/swim-in-rising-water/", gfg:"https://www.geeksforgeeks.org/swim-in-rising-water/", yt:"https://youtu.be/amvrKlMLuGY", patternTags:["Graph","Dijkstra","Union Find"] },
    ]},
    { id: "15.6", title: "Other Algorithms", problems: [
      { id:667, name:"Bridges in Graph (Tarjan's Algorithm)",         difficulty:"Hard",   lc:"https://leetcode.com/problems/critical-connections-in-a-network/", gfg:"https://www.geeksforgeeks.org/bridge-in-a-graph/", yt:"https://youtu.be/qrAub5z8FeA", patternTags:["Graph","DFS"] },
      { id:668, name:"Articulation Point",                            difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/", yt:"https://youtu.be/64KK9K4RpKE", patternTags:["Graph","DFS"] },
      { id:669, name:"Kosaraju's Algorithm (Strongly Connected Components)", difficulty:"Hard", lc:null, gfg:"https://www.geeksforgeeks.org/strongly-connected-components/", yt:"https://youtu.be/V8qIqJxCioo", patternTags:["Graph","DFS"] },
      { id:6691, name:"Tarjan's Algorithm (Strongly Connected Components)", difficulty:"Hard", lc:null, gfg:"https://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/", yt:"https://youtu.be/wUgWX0nc4NY", patternTags:["Graph","DFS"] },
    ]},
  ]
};

const TOPIC_DP = {
  stepId: "step16", stepTitle: "Step 16: Dynamic Programming [Patterns and Problems]", color: "#A78BFA",
  subtopics: [
    { id: "16.1", title: "Introduction to DP", problems: [
      { id:6801, name:"Introduction to Dynamic Programming",          difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/dynamic-programming/", yt:"https://youtu.be/tyB0ztf0DNY", patternTags:["DP"] },
      { id:680, name:"Climbing Stairs",                               difficulty:"Easy",   lc:"https://leetcode.com/problems/climbing-stairs/", gfg:"https://www.geeksforgeeks.org/count-ways-reach-nth-stair/", yt:"https://youtu.be/mLfjzJsN8us", patternTags:["DP"] },
      { id:681, name:"Frog Jump (DP 1D)",                             difficulty:"Easy",   lc:null, gfg:"https://www.geeksforgeeks.org/minimum-cost-to-reach-destination-in-a-maze/", yt:"https://youtu.be/EgG3jsGoPvQ", patternTags:["DP"] },
      { id:682, name:"Frog Jump with K Distances",                    difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/minimum-jumps-to-reach-home/", yt:"https://youtu.be/Kmh3rhyEtB8", patternTags:["DP"] },
      { id:683, name:"Maximum Sum of Non-Adjacent Elements",          difficulty:"Medium", lc:"https://leetcode.com/problems/house-robber/", gfg:"https://www.geeksforgeeks.org/maximum-sum-such-that-no-two-elements-are-adjacent/", yt:"https://youtu.be/GrMBfJNk_NY", patternTags:["DP"] },
      { id:684, name:"House Robber II",                               difficulty:"Medium", lc:"https://leetcode.com/problems/house-robber-ii/", gfg:"https://www.geeksforgeeks.org/house-robber-ii/", yt:"https://youtu.be/3WaxQMELSkw", patternTags:["DP"] },
    ]},
    { id: "16.2", title: "2D / 3D DP and DP on Grids", problems: [
      { id:685, name:"Ninja's Training",                              difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/ninja-training/", yt:"https://youtu.be/AE39gJYuRog", patternTags:["DP"] },
      { id:686, name:"Grid Unique Paths",                             difficulty:"Medium", lc:"https://leetcode.com/problems/unique-paths/", gfg:"https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/", yt:"https://youtu.be/sdE0A2Oxofw", patternTags:["DP","Matrix"] },
      { id:687, name:"Grid Unique Paths II",                          difficulty:"Medium", lc:"https://leetcode.com/problems/unique-paths-ii/", gfg:"https://www.geeksforgeeks.org/unique-paths-in-a-grid-with-obstacles/", yt:"https://youtu.be/TmhpgXScLyY", patternTags:["DP","Matrix"] },
      { id:688, name:"Minimum Path Sum in Grid",                      difficulty:"Medium", lc:"https://leetcode.com/problems/minimum-path-sum/", gfg:"https://www.geeksforgeeks.org/minimum-path-sum/", yt:"https://youtu.be/_rgPMd5EZmk", patternTags:["DP","Matrix"] },
      { id:689, name:"Minimum Path Sum in Triangular Grid",           difficulty:"Medium", lc:"https://leetcode.com/problems/triangle/", gfg:"https://www.geeksforgeeks.org/minimum-sum-path-triangle/", yt:"https://youtu.be/SrP-PiLSYC0", patternTags:["DP"] },
      { id:690, name:"Minimum/Maximum Falling Path Sum",              difficulty:"Medium", lc:"https://leetcode.com/problems/minimum-falling-path-sum/", gfg:"https://www.geeksforgeeks.org/minimum-falling-path-sum/", yt:"https://youtu.be/N_aJ5pQNxWc", patternTags:["DP","Matrix"] },
      { id:691, name:"3D DP — Chocolate Pickup",                     difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/maximize-the-total-profit-of-all-the-persons/", yt:"https://youtu.be/vYSte-AB1_0", patternTags:["DP"] },
    ]},
    { id: "16.3", title: "DP on Subsequences", problems: [
      { id:692, name:"Subset Sum Equal to Target",                    difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/subset-sum-problem-dp-25/", yt:"https://youtu.be/fWX9xDmIzRI", patternTags:["DP","Subset"] },
      { id:693, name:"Partition Equal Subset Sum",                    difficulty:"Medium", lc:"https://leetcode.com/problems/partition-equal-subset-sum/", gfg:"https://www.geeksforgeeks.org/problems/subset-sum-problem2014/1", yt:"https://youtu.be/7win3dcgo3k", patternTags:["DP","Subset"] },
      { id:694, name:"Partition Set Into 2 Subsets With Min Abs Sum Diff", difficulty:"Hard", lc:null, gfg:"https://www.geeksforgeeks.org/partition-a-set-into-two-subsets-such-that-the-difference-of-subset-sums-is-minimum/", yt:"https://youtu.be/GS_OqZb2Ckc", patternTags:["DP","Subset"] },
      { id:695, name:"Count Subsets with Sum K",                      difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/count-of-subsets-with-sum-equal-to-x/", yt:"https://youtu.be/ZHyb-A2Mte4", patternTags:["DP","Subset"] },
      { id:6951, name:"Count Partitions with Given Difference",        difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/problems/partitions-with-given-difference/1", yt:"https://youtu.be/zoilQD1kYSg", patternTags:["DP","Subset"] },
      { id:696, name:"0/1 Knapsack",                                  difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/", yt:"https://youtu.be/GqOmJHQZivw", patternTags:["DP","Knapsack"] },
      { id:697, name:"Coin Change (Minimum Coins)",                   difficulty:"Medium", lc:"https://leetcode.com/problems/coin-change/", gfg:"https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/", yt:"https://youtu.be/myPeWb3X9Gg", patternTags:["DP","Knapsack"] },
      { id:6971, name:"Target Sum",                                    difficulty:"Medium", lc:"https://leetcode.com/problems/target-sum/", gfg:"https://www.geeksforgeeks.org/problems/target-sum-1626326450/1", yt:"https://youtu.be/w5MhgmmUGio", patternTags:["DP","Knapsack"] },
      { id:698, name:"Coin Change II (Number of Ways)",               difficulty:"Medium", lc:"https://leetcode.com/problems/coin-change-ii/", gfg:"https://www.geeksforgeeks.org/coin-change-dp-7/", yt:"https://youtu.be/HgyouUi11zk", patternTags:["DP","Knapsack"] },
      { id:699, name:"Unbounded Knapsack",                            difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/", yt:"https://youtu.be/OgvOZ6OrJoY", patternTags:["DP","Knapsack"] },
      { id:700, name:"Rod Cutting Problem",                           difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/cutting-a-rod-dp-13/", yt:"https://youtu.be/mO8XpGoJwuo", patternTags:["DP","Knapsack"] },
    ]},
    { id: "16.4", title: "DP on Strings", problems: [
      { id:701, name:"Longest Common Subsequence",                    difficulty:"Medium", lc:"https://leetcode.com/problems/longest-common-subsequence/", gfg:"https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/", yt:"https://youtu.be/sSno9rV8Rhg", patternTags:["DP","Strings"] },
      { id:702, name:"Print Longest Common Subsequence",              difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/printing-longest-common-subsequence/", yt:"https://youtu.be/-zI4mrF2Gu4", patternTags:["DP","Strings"] },
      { id:703, name:"Longest Common Substring",                      difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/longest-common-substring-dp-29/", yt:"https://youtu.be/_wP9mVysobI", patternTags:["DP","Strings"] },
      { id:704, name:"Longest Palindromic Subsequence",               difficulty:"Medium", lc:"https://leetcode.com/problems/longest-palindromic-subsequence/", gfg:"https://www.geeksforgeeks.org/longest-palindromic-subsequence-dp-12/", yt:"https://youtu.be/6i_T5kkfv4A", patternTags:["DP","Strings"] },
      { id:705, name:"Minimum Insertions to Make String Palindrome",  difficulty:"Hard",   lc:"https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/", gfg:"https://www.geeksforgeeks.org/minimum-insertions-to-form-a-palindrome-dp-28/", yt:"https://youtu.be/xPBLEj41rFU", patternTags:["DP","Strings"] },
      { id:706, name:"Minimum Insertions/Deletions to Convert String",difficulty:"Medium", lc:"https://leetcode.com/problems/delete-operation-for-two-strings/", gfg:"https://www.geeksforgeeks.org/minimum-number-deletions-insertions-transform-one-string-another/", yt:"https://youtu.be/yMnH0jrir0Q", patternTags:["DP","Strings"] },
      { id:707, name:"Shortest Common Supersequence",                 difficulty:"Hard",   lc:"https://leetcode.com/problems/shortest-common-supersequence/", gfg:"https://www.geeksforgeeks.org/shortest-common-supersequence/", yt:"https://youtu.be/xElxAuBcvsU", patternTags:["DP","Strings"] },
      { id:708, name:"Edit Distance",                                 difficulty:"Hard",   lc:"https://leetcode.com/problems/edit-distance/", gfg:"https://www.geeksforgeeks.org/edit-distance-dp-5/", yt:"https://youtu.be/FgnJs_zUOiU", patternTags:["DP","Strings"] },
      { id:709, name:"Wildcard Matching",                             difficulty:"Hard",   lc:"https://leetcode.com/problems/wildcard-matching/", gfg:"https://www.geeksforgeeks.org/wildcard-pattern-matching/", yt:"https://youtu.be/ZmlQ3vgAOMo", patternTags:["DP","Strings"] },
    ]},
    { id: "16.5", title: "DP on Stocks", problems: [
      { id:710, name:"Best Time to Buy and Sell Stock",               difficulty:"Easy",   lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", gfg:"https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/", yt:"https://youtu.be/ioFPBdChabY", patternTags:["DP","Stocks","Greedy"] },
      { id:711, name:"Buy and Sell Stock II",                         difficulty:"Medium", lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", gfg:"https://www.geeksforgeeks.org/stock-buy-sell/", yt:"https://youtu.be/nGJmxkUJQGs", patternTags:["DP","Stocks","Greedy"] },
      { id:712, name:"Buy and Sell Stock III",                        difficulty:"Hard",   lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/", gfg:"https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-twice/", yt:"https://youtu.be/wuzTpONbd-8", patternTags:["DP","Stocks"] },
      { id:713, name:"Buy and Sell Stock IV",                         difficulty:"Hard",   lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/", gfg:"https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-k-times/", yt:"https://youtu.be/IV1dHbk5Zm4", patternTags:["DP","Stocks"] },
      { id:714, name:"Buy and Sell Stocks With Cooldown",             difficulty:"Medium", lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/", gfg:"https://www.geeksforgeeks.org/stock-buy-sell-with-cooldown/", yt:"https://youtu.be/4Kh29-HfE3M", patternTags:["DP","Stocks"] },
      { id:715, name:"Buy and Sell Stocks With Transaction Fee",      difficulty:"Medium", lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/", gfg:"https://www.geeksforgeeks.org/maximum-profit-from-stock-with-transaction-fee/", yt:"https://youtu.be/Q1oBBp7t0_M", patternTags:["DP","Stocks","Greedy"] },
    ]},
    { id: "16.6", title: "DP on LIS", problems: [
      { id:716, name:"Longest Increasing Subsequence",                difficulty:"Medium", lc:"https://leetcode.com/problems/longest-increasing-subsequence/", gfg:"https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/", yt:"https://youtu.be/ekcwMsSIzVc", patternTags:["DP","LIS"] },
      { id:717, name:"Print Longest Increasing Subsequence",          difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/construction-of-longest-monotonically-increasing-subsequence-n-log-n/", yt:"https://youtu.be/IFfYfonAFGc", patternTags:["DP","LIS"] },
      { id:718, name:"LIS using Binary Search O(n log n)",            difficulty:"Medium", lc:"https://leetcode.com/problems/longest-increasing-subsequence/", gfg:"https://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/", yt:"https://youtu.be/on2hvxBXJH4", patternTags:["DP","LIS","Binary Search"] },
      { id:719, name:"Largest Divisible Subset",                      difficulty:"Medium", lc:"https://leetcode.com/problems/largest-divisible-subset/", gfg:"https://www.geeksforgeeks.org/largest-divisible-subset/", yt:"https://youtu.be/gDuZwBW9VvM", patternTags:["DP","LIS"] },
      { id:720, name:"Longest String Chain",                          difficulty:"Medium", lc:"https://leetcode.com/problems/longest-string-chain/", gfg:"https://www.geeksforgeeks.org/longest-string-chain/", yt:"https://youtu.be/YY8iBaYcc4g", patternTags:["DP","LIS"] },
      { id:721, name:"Longest Bitonic Subsequence",                   difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/longest-bitonic-subsequence-dp-15/", yt:"https://youtu.be/y4vN0WNdrlg", patternTags:["DP","LIS"] },
      { id:722, name:"Number of Longest Increasing Subsequences",     difficulty:"Medium", lc:"https://leetcode.com/problems/number-of-longest-increasing-subsequence/", gfg:"https://www.geeksforgeeks.org/number-of-longest-increasing-subsequences/", yt:"https://youtu.be/cKVl1TFdNXg", patternTags:["DP","LIS"] },
    ]},
    { id: "16.7", title: "MCM DP | Partition DP", problems: [
      { id:723, name:"Matrix Chain Multiplication",                   difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/", yt:"https://youtu.be/vRVfmbCFW7Y", patternTags:["DP","MCM"] },
      { id:7231, name:"Matrix Chain Multiplication — Bottom Up",      difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/", yt:"https://youtu.be/pDCXsbAeQz0", patternTags:["DP","MCM"] },
      { id:724, name:"Minimum Cost to Cut the Stick",                 difficulty:"Hard",   lc:"https://leetcode.com/problems/minimum-cost-to-cut-a-stick/", gfg:"https://www.geeksforgeeks.org/minimum-cost-to-cut-a-stick/", yt:"https://youtu.be/xwomavsC86c", patternTags:["DP","MCM"] },
      { id:725, name:"Burst Balloons",                                difficulty:"Hard",   lc:"https://leetcode.com/problems/burst-balloons/", gfg:"https://www.geeksforgeeks.org/burst-balloon-to-maximize-coins/", yt:"https://youtu.be/Yz4LlDSlkns", patternTags:["DP","MCM"] },
      { id:726, name:"Evaluate Boolean Expression to True",           difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/boolean-parenthesization-problem-dp-37/", yt:"https://youtu.be/MM7fXopgyjw", patternTags:["DP","MCM"] },
      { id:727, name:"Palindrome Partitioning II",                    difficulty:"Hard",   lc:"https://leetcode.com/problems/palindrome-partitioning-ii/", gfg:"https://www.geeksforgeeks.org/palindrome-partitioning-dp-17/", yt:"https://youtu.be/_H8V5hJUGd0", patternTags:["DP","MCM"] },
      { id:728, name:"Partition Array for Maximum Sum",               difficulty:"Medium", lc:"https://leetcode.com/problems/partition-array-for-maximum-sum/", gfg:"https://www.geeksforgeeks.org/partition-array-maximum-sum/", yt:"https://youtu.be/PhWWJmaKfMc", patternTags:["DP","MCM"] },
    ]},
    { id: "16.8", title: "DP on Squares", problems: [
      { id:729, name:"Maximum Rectangle Area with All 1's",           difficulty:"Hard",   lc:"https://leetcode.com/problems/maximal-rectangle/", gfg:"https://www.geeksforgeeks.org/maximum-size-rectangle-binary-sub-matrix-1s/", yt:"https://youtu.be/tOkVAjFHBH0", patternTags:["DP","Stack","Matrix"] },
      { id:730, name:"Count Square Submatrices with All Ones",        difficulty:"Medium", lc:"https://leetcode.com/problems/count-square-submatrices-with-all-ones/", gfg:"https://www.geeksforgeeks.org/count-of-squares-with-all-sides-1/", yt:"https://youtu.be/auS1fynpnjo", patternTags:["DP","Matrix"] },
    ]},
  ]
};

const TOPIC_TRIES = {
  stepId: "step17", stepTitle: "Step 17: Tries", color: "#F43F5E",
  subtopics: [
    { id: "17.1", title: "Theory", problems: [
      { id:740, name:"Implement Trie I (Insert, Search, StartsWith)", difficulty:"Medium", lc:"https://leetcode.com/problems/implement-trie-prefix-tree/", gfg:"https://www.geeksforgeeks.org/trie-insert-and-search/", yt:"https://youtu.be/dBGUmUQhjaM", patternTags:["Trie"] },
      { id:741, name:"Implement Trie II (Count Prefix, Complete Word)",difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/implement-a-trie-data-structure/", yt:"https://youtu.be/K5pcpkEMCN0", patternTags:["Trie"] },
    ]},
    { id: "17.2", title: "Problems", problems: [
      { id:742, name:"Longest String with All Prefixes",              difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/longest-string-where-each-character-can-be-found-in-previous-prefixes/", yt:"https://youtu.be/AWnBa91lThI", patternTags:["Trie"] },
      { id:743, name:"Number of Distinct Substrings in a String",     difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/count-distinct-substrings-of-a-string-using-suffix-trie/", yt:"https://youtu.be/RV0QETsfOf0", patternTags:["Trie"] },
      { id:7431, name:"Bit Prerequisites for TRIE Problems",          difficulty:"Medium", lc:null, gfg:"https://www.geeksforgeeks.org/trie-memory-optimization-using-hash-map/", yt:"https://youtu.be/vLet1lysSmg", patternTags:["Trie","Bit Manipulation"] },
      { id:744, name:"Maximum XOR of Two Numbers in an Array",        difficulty:"Medium", lc:"https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", gfg:"https://www.geeksforgeeks.org/maximum-xor-of-two-numbers-in-an-array/", yt:"https://youtu.be/jCu-Pd0T48k", patternTags:["Trie","Bit Manipulation"] },
      { id:745, name:"Maximum XOR With an Element From Array",        difficulty:"Hard",   lc:"https://leetcode.com/problems/maximum-xor-with-an-element-from-array/", gfg:"https://www.geeksforgeeks.org/maximum-xor-with-an-element-from-array/", yt:"https://youtu.be/Q8LhG9Pi5KM", patternTags:["Trie","Bit Manipulation"] },
    ]},
  ]
};

const TOPIC_STRINGS_ADV = {
  stepId: "step18", stepTitle: "Step 18: Strings", color: "#EC4899",
  subtopics: [
    { id: "18.1", title: "Hard Problems", problems: [
      { id:7501, name:"Min Bracket Reversals to Balance Expression",  difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/minimum-number-of-bracket-reversals-needed-to-make-an-expression-balanced/", yt:"https://youtu.be/bNzmLrOQEyE", patternTags:["Strings","Stack"] },
      { id:7502, name:"Count and Say",                                difficulty:"Medium", lc:"https://leetcode.com/problems/count-and-say/", gfg:"https://www.geeksforgeeks.org/look-and-say-sequence/", yt:"https://youtu.be/F7Y6xyL3Bkk", patternTags:["Strings"] },
      { id:756, name:"String Hashing",                                difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/string-hashing-using-polynomial-rolling-hash-function/", yt:"https://youtu.be/WaqFggB8B30", patternTags:["Strings","Hashing"] },
      { id:753, name:"Rabin Karp Algorithm",                          difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/", yt:"https://youtu.be/qQ8vS2btsxI", patternTags:["Strings","Hashing"] },
      { id:752, name:"Z-Function",                                    difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/", yt:"https://youtu.be/CpZh4eF8QBw", patternTags:["Strings","Z-Algorithm"] },
      { id:751, name:"KMP Algorithm / LPS (Longest Prefix Suffix)",   difficulty:"Hard",   lc:"https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", gfg:"https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/", yt:"https://youtu.be/V5-7GzOfADQ", patternTags:["Strings","KMP"] },
      { id:755, name:"Shortest Palindrome",                           difficulty:"Hard",   lc:"https://leetcode.com/problems/shortest-palindrome/", gfg:"https://www.geeksforgeeks.org/minimum-characters-to-be-added-at-front-to-make-string-palindrome/", yt:"https://youtu.be/c-dMIKa3yTQ", patternTags:["Strings","KMP"] },
      { id:758, name:"Longest Substring with At Least K Repeating Characters", difficulty:"Medium", lc:"https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/", gfg:"https://www.geeksforgeeks.org/longest-substring-with-at-least-k-repeating-characters/", yt:"https://youtu.be/5e_w68zUe7o", patternTags:["Strings","Sliding Window","Divide and Conquer"] },
      { id:757, name:"Suffix Array",                                  difficulty:"Hard",   lc:null, gfg:"https://www.geeksforgeeks.org/suffix-array-set-1-introduction/", yt:"https://youtu.be/uxA__b23t2w", patternTags:["Strings"] },
    ]},
  ]
};

const ALL_TOPICS = [
  TOPIC_SORTING, TOPIC_ARRAYS, TOPIC_BINARY_SEARCH,
  TOPIC_STRINGS, TOPIC_LINKED_LIST, TOPIC_RECURSION, TOPIC_BIT_MANIPULATION, TOPIC_STACK_QUEUES,
  TOPIC_SLIDING_WINDOW, TOPIC_HEAPS, TOPIC_GREEDY, TOPIC_BINARY_TREES,
  TOPIC_BST, TOPIC_GRAPHS, TOPIC_DP, TOPIC_TRIES, TOPIC_STRINGS_ADV,
];

const SHEET = ALL_TOPICS;

const ALL_PROBLEMS = SHEET.flatMap(step =>
  step.subtopics.flatMap(sub =>
    sub.problems.map(p => ({ ...p, stepId: step.stepId, stepTitle: step.stepTitle, stepColor: step.color, subtopicId: sub.id, subtopicTitle: sub.title }))
  )
);



// ════════════════════════════════════════════════════════════════════════════
// MOTIVATIONAL QUOTES
// ════════════════════════════════════════════════════════════════════════════
const QUOTES = [
  { text: "Success in DSA isn't solving 10 problems in one day. It's solving 1 problem every day for 100 days.", author: "A2Z Revision Hub" },
  { text: "Every problem you struggle with today becomes an interview question you won't fear tomorrow.", author: "A2Z Revision Hub" },
  { text: "Consistency beats motivation. Show up even when you don't feel like coding.", author: "A2Z Revision Hub" },
  { text: "The difference between a beginner and an expert is thousands of mistakes they refused to quit on.", author: "A2Z Revision Hub" },
  { text: "One solved problem may not change your future, but a habit of solving problems will.", author: "A2Z Revision Hub" },
  { text: "Don't compare your chapter 1 to someone else's chapter 20. Focus on your own journey.", author: "A2Z Revision Hub" },
  { text: "The hardest problem often teaches the most valuable lesson.", author: "A2Z Revision Hub" },
  { text: "A placement offer is earned long before interview day. It is built through daily practice.", author: "A2Z Revision Hub" },
  { text: "Progress is not measured by speed. It is measured by persistence.", author: "A2Z Revision Hub" },
  { text: "Every time you revisit a topic, you are strengthening the foundation of your future career.", author: "A2Z Revision Hub" },
  { text: "Great programmers are not born. They are built one bug, one concept, and one problem at a time.", author: "A2Z Revision Hub" },
  { text: "The version of you that cracks placements is created by the choices you make today.", author: "A2Z Revision Hub" },
  { text: "Mastering DSA is not about intelligence. It is about patience, repetition, and discipline.", author: "A2Z Revision Hub" },
  { text: "Small daily improvements eventually create extraordinary results.", author: "A2Z Revision Hub" },
  { text: "Keep solving. Keep learning. Keep improving. Your future self will thank you.", author: "A2Z Revision Hub" },
];

const getDailyQuote = () => {
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / 86400000) % QUOTES.length;
  return QUOTES[dayIndex];
};

// ════════════════════════════════════════════════════════════════════════════
// STORAGE HELPERS
// ════════════════════════════════════════════════════════════════════════════
const LS = "dsa_v1";
const load = () => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch { return {}; } };
const save = (d) => { try { localStorage.setItem(LS, JSON.stringify(d)); } catch {} };

const ACTIVITY_LS = "dsa_activity_v1";
const loadActivity = () => { try { return JSON.parse(localStorage.getItem(ACTIVITY_LS)) || {}; } catch { return {}; } };
const saveActivity = (d) => { try { localStorage.setItem(ACTIVITY_LS, JSON.stringify(d)); } catch {} };

const PRACTICE_LS = "dsa_practice_v1";
const loadPractice = () => { try { return JSON.parse(localStorage.getItem(PRACTICE_LS)) || null; } catch { return null; } };
const savePractice = (d) => { try { localStorage.setItem(PRACTICE_LS, JSON.stringify(d)); } catch {} };

const SETTINGS_LS = "dsa_settings_v1";
const DEFAULT_SETTINGS = { dailyGoal: 3 };
const loadSettings = () => { try { return { ...DEFAULT_SETTINGS, ...(JSON.parse(localStorage.getItem(SETTINGS_LS)) || {}) }; } catch { return { ...DEFAULT_SETTINGS }; } };
const saveSettings = (d) => { try { localStorage.setItem(SETTINGS_LS, JSON.stringify(d)); } catch {} };

const PROFILE_LS = "dsa_profile_v1";
const DEFAULT_PROFILE = { name: "Sumit Singh Thakur", goal: "Crack FAANG", github: "sumit25mim10015-byte", linkedin: "sumit-singh-thakur", gfg: "sumitth8nc9", leetcode: "sumit799", codeforces: "", avatarColor: "#7C3AED" };
const loadProfile = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(PROFILE_LS)) || {};
    const merged = { ...DEFAULT_PROFILE };
    // Only let a stored value override the default if it's actually non-empty.
    // This prevents stale blank strings (saved before defaults existed) from
    // permanently masking newly-added default values.
    Object.keys(stored).forEach(k => {
      if (stored[k] !== "" && stored[k] !== null && stored[k] !== undefined) {
        merged[k] = stored[k];
      }
    });
    return merged;
  } catch {
    return { ...DEFAULT_PROFILE };
  }
};
const saveProfile = (d) => { try { localStorage.setItem(PROFILE_LS, JSON.stringify(d)); } catch {} };

const todayKey = () => new Date().toISOString().slice(0, 10);

const bumpActivity = (activity, dateKey = todayKey(), by = 1) => {
  const next = { ...activity, [dateKey]: (activity[dateKey] || 0) + by };
  saveActivity(next);
  return next;
};

// ════════════════════════════════════════════════════════════════════════════
// HEATMAP
// ════════════════════════════════════════════════════════════════════════════
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const buildHeatmap = (activity) => {
  const today = new Date();
  const dow = today.getDay();
  const start = new Date(today);
  start.setDate(today.getDate() - dow - 52 * 7);
  const weeks = [];
  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dt = new Date(start);
      dt.setDate(start.getDate() + w * 7 + d);
      const isFuture = dt > today;
      const dateStr = dt.toISOString().slice(0, 10);
      const count = isFuture ? 0 : (activity[dateStr] || 0);
      week.push({ date: dateStr, count, isFuture });
    }
    weeks.push(week);
  }
  return weeks;
};

const getMonthLabels = (heatmap) => {
  const out = []; let last = -1;
  heatmap.forEach((wk, wi) => {
    const m = new Date(wk[0].date).getMonth();
    if (m !== last) { out.push({ wi, m }); last = m; }
  });
  return out;
};

const heatCol = (c, f) => f ? "transparent" : ["#161B22","#0E4429","#006D32","#26A641","#39D353"][c === 0 ? 0 : c <= 2 ? 1 : c <= 4 ? 2 : c <= 7 ? 3 : 4];

// ════════════════════════════════════════════════════════════════════════════
// REVISION ENGINE
// ════════════════════════════════════════════════════════════════════════════
const REVISION_OFFSETS = [3, 10, 30];

const addDays = (dateStr, days) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const buildRevisionHistory = (solvedDate) => REVISION_OFFSETS.map((days, i) => ({
  stage: i + 1,
  dueDate: addDays(solvedDate, days),
  done: false,
}));

const daysAgo = (dateStr) => {
  if (!dateStr) return null;
  return Math.floor((Date.now() - new Date(dateStr)) / 86400000);
};
const daysAgoLabel = (dateStr) => {
  const diff = daysAgo(dateStr);
  if (diff === null) return "Never";
  if (diff <= 0) return "Today";
  if (diff === 1) return "1 day ago";
  return `${diff} days ago`;
};
const daysAgoColor = (dateStr) => {
  const diff = daysAgo(dateStr);
  if (diff === null) return "#484F58";
  if (diff <= 7) return "#3FB950";
  if (diff <= 30) return "#E3B341";
  return "#F85149";
};

const DANGER_THRESHOLD = 60;
const getDangerZone = (progress) => {
  return ALL_PROBLEMS
    .map(p => {
      const pr = progress[p.id];
      if (!pr || !["Solved","Revised"].includes(pr.status)) return null;
      const hasCompletedRevision = (pr.revisionHistory || []).some(r => r.done);
      const lastRevisedDays = daysAgo(pr.lastRevised);
      const lastSolvedDays  = daysAgo(pr.lastSolved);
      let daysSince = null;
      if (pr.lastRevised && lastRevisedDays > DANGER_THRESHOLD) daysSince = lastRevisedDays;
      else if (!hasCompletedRevision && pr.lastSolved && lastSolvedDays > DANGER_THRESHOLD) daysSince = lastSolvedDays;
      if (daysSince === null) return null;
      return { ...p, daysSince };
    })
    .filter(Boolean)
    .sort((a, b) => b.daysSince - a.daysSince);
};

const STATUS_SOURCES = ["Solved","Revised","Attempted","Not Started"];

const generatePracticeSet = (progress, { topic, difficulties, sources, count }) => {
  let pool = ALL_PROBLEMS.filter(p => {
    if (topic && topic !== "Any" && p.stepTitle !== topic) return false;
    if (difficulties && difficulties.length && !difficulties.includes("Any") && !difficulties.includes(p.difficulty)) return false;
    const st = progress[p.id]?.status || "Not Started";
    if (sources && sources.length && !sources.includes(st)) return false;
    return true;
  });
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
};

const isValidUrl = (url) => typeof url === "string" && /^https?:\/\//.test(url.trim());

// ════════════════════════════════════════════════════════════════════════════
// STREAK + RECORDS
// ════════════════════════════════════════════════════════════════════════════
const computeStreak = (activity) => {
  const hasToday = (activity[todayKey()] || 0) > 0;
  let cursor = new Date();
  if (!hasToday) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if ((activity[key] || 0) > 0) { streak++; cursor.setDate(cursor.getDate() - 1); }
    else break;
  }
  return streak;
};

const computePersonalRecords = (activity) => {
  const entries = Object.entries(activity).filter(([, count]) => count > 0);
  let bestDay = null, bestCount = 0;
  entries.forEach(([date, count]) => { if (count > bestCount) { bestCount = count; bestDay = date; } });
  const activeDates = entries.map(([date]) => date).sort();
  let longestStreak = 0, currentRun = 0, prevDate = null;
  activeDates.forEach(date => {
    if (prevDate) {
      const diffDays = Math.round((new Date(date) - new Date(prevDate)) / 86400000);
      currentRun = diffDays === 1 ? currentRun + 1 : 1;
    } else { currentRun = 1; }
    if (currentRun > longestStreak) longestStreak = currentRun;
    prevDate = date;
  });
  return { bestDay, bestCount, longestStreak };
};

const computeSummary = (progress, activity, days) => {
  const today = new Date();
  const cutoff = new Date(today);
  cutoff.setDate(cutoff.getDate() - (days - 1));
  const cutoffKey = cutoff.toISOString().slice(0, 10);
  let totalActivity = 0;
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    totalActivity += activity[d.toISOString().slice(0, 10)] || 0;
  }
  const solvedInWindow = [];
  const revisedInWindow = [];
  Object.entries(progress).forEach(([id, pr]) => {
    if (pr.lastSolved && pr.lastSolved >= cutoffKey) {
      const problem = ALL_PROBLEMS.find(p => p.id === Number(id));
      if (problem) solvedInWindow.push(problem);
    }
    (pr.revisionHistory || []).forEach(r => {
      if (r.done && r.doneDate && r.doneDate >= cutoffKey) {
        const problem = ALL_PROBLEMS.find(p => p.id === Number(id));
        if (problem) revisedInWindow.push(problem);
      }
    });
  });
  const byDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
  solvedInWindow.forEach(p => { byDifficulty[p.difficulty] = (byDifficulty[p.difficulty] || 0) + 1; });
  const byTopic = {};
  solvedInWindow.forEach(p => { byTopic[p.stepTitle] = (byTopic[p.stepTitle] || 0) + 1; });
  let focusTopic = null, focusCount = 0;
  Object.entries(byTopic).forEach(([t, c]) => { if (c > focusCount) { focusTopic = t; focusCount = c; } });
  return { days, totalActivity, solvedCount: solvedInWindow.length, revisedCount: revisedInWindow.length, byDifficulty, focusTopic, focusCount, dailyAvg: Math.round((totalActivity / days) * 10) / 10 };
};

const exportProgress = (progress, activity) => {
  const payload = { exportedAt: new Date().toISOString(), version: 1, progress, activity };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `dsa-tracker-backup-${todayKey()}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// ════════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════════
const DC = d => ({ Easy:"#3FB950", Medium:"#E3B341", Hard:"#F85149" }[d] || "#8B949E");
const DB = d => ({ Easy:"rgba(63,185,80,.12)", Medium:"rgba(227,179,65,.12)", Hard:"rgba(248,81,73,.12)" }[d] || "rgba(139,148,158,.12)");
const SC = s => ({ Solved:"#3FB950", Revised:"#A78BFA", Attempted:"#E3B341", "Not Started":"#484F58" }[s] || "#484F58");
const SB = s => ({ Solved:"rgba(63,185,80,.12)", Revised:"rgba(167,139,250,.12)", Attempted:"rgba(227,179,65,.12)", "Not Started":"rgba(72,79,88,.12)" }[s] || "rgba(72,79,88,.12)");

// ════════════════════════════════════════════════════════════════════════════
// MILESTONE SYSTEM
// ════════════════════════════════════════════════════════════════════════════
const MILESTONES = [
  { id: "bronze",   label: "Bronze",   threshold: 50,   color: "#CD7F32", emoji: "🥉", glow: "rgba(205,127,50,0.4)" },
  { id: "silver",   label: "Silver",   threshold: 100,  color: "#C0C0C0", emoji: "🥈", glow: "rgba(192,192,192,0.4)" },
  { id: "gold",     label: "Gold",     threshold: 250,  color: "#FFD700", emoji: "🥇", glow: "rgba(255,215,0,0.4)" },
  { id: "diamond",  label: "Diamond",  threshold: 500,  color: "#B9F2FF", emoji: "💎", glow: "rgba(185,242,255,0.4)" },
  { id: "legend",   label: "Legend",   threshold: 1000, color: "#A78BFA", emoji: "👑", glow: "rgba(167,139,250,0.4)" },
];

const getMilestoneData = (solved) => {
  const current = [...MILESTONES].reverse().find(m => solved >= m.threshold) || null;
  const next = MILESTONES.find(m => solved < m.threshold) || null;
  const prevThreshold = current ? current.threshold : 0;
  const nextThreshold = next ? next.threshold : MILESTONES[MILESTONES.length - 1].threshold;
  const pct = next ? Math.min(100, Math.round(((solved - prevThreshold) / (nextThreshold - prevThreshold)) * 100)) : 100;
  return { current, next, pct, prevThreshold, nextThreshold };
};

// ════════════════════════════════════════════════════════════════════════════
// ANIMATED COUNT-UP HOOK
// ════════════════════════════════════════════════════════════════════════════
function useCountUp(target, duration = 1200, trigger = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const from = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, trigger]);
  return val;
}

// ════════════════════════════════════════════════════════════════════════════
// SHARED FRAMER MOTION VARIANTS
// Kept fast (200-400ms) and restrained — no bounce/spin, just fade+slide.
// ════════════════════════════════════════════════════════════════════════════
const fadeSlideUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
};

// Stagger container — children fire 60ms apart, capped so long lists don't
// take forever to finish entering.
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
};

const modalBackdropVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: "easeIn" } },
};

const modalPanelVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: [0.34, 1.2, 0.64, 1] } },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.18, ease: "easeIn" } },
};

// Page/section switch — quick fade + tiny slide, never more than ~250ms
const pageTransitionVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: "easeIn" } },
};

// Card hover — translateY(-4px) + soft glow, per spec
const cardHoverTransition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };

function ProgressBar({ value, max, color, height = 4, animate = false }) {
  const [pct, setPct] = useState(animate ? 0 : Math.min((value / Math.max(max, 1)) * 100, 100));
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setPct(Math.min((value / Math.max(max, 1)) * 100, 100)), 100);
    return () => clearTimeout(t);
  }, [value, max, animate]);
  const realPct = animate ? pct : Math.min((value / Math.max(max, 1)) * 100, 100);
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 9999, overflow: "hidden", height }}>
      <div style={{ width: `${realPct}%`, height: "100%", background: color, borderRadius: 9999, transition: animate ? "width 1.2s cubic-bezier(0.22,1,0.36,1)" : "width .6s ease", boxShadow: `0 0 6px ${color}66` }} />
    </div>
  );
}

function DiffBadge({ d }) {
  return <span style={{ color: DC(d), background: DB(d), padding: "2px 7px", borderRadius: 5, fontSize: 11, fontWeight: 600, lineHeight: 1.6, display: "inline-block" }}>{d}</span>;
}

function StatusBadge({ s }) {
  return <span style={{ color: SC(s), background: SB(s), padding: "2px 7px", borderRadius: 5, fontSize: 11, fontWeight: 600, lineHeight: 1.6, display: "inline-flex", alignItems: "center", gap: 3, whiteSpace: "nowrap" }}>{s === "Solved" ? "✓ " : s === "Revised" ? "✦ " : ""}{s}</span>;
}

function LinkPills({ p }) {
  const pills = [
    { key: "lc", label: "LC", color: "#E3B341", url: p.lc },
    { key: "gfg", label: "GFG", color: "#2EC866", url: p.gfg },
    { key: "yt", label: "YT", color: "#F85149", url: p.yt },
  ].filter(x => isValidUrl(x.url));
  if (!pills.length) return <span style={{ color: "#484F58", fontSize: 12 }}>—</span>;
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {pills.map(({ key, label, color, url }) => (
        <a key={key} href={url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
          style={{ color, border: `1px solid ${color}33`, background: `${color}12`, padding: "2px 6px", borderRadius: 4, fontSize: 11, fontWeight: 700, textDecoration: "none", lineHeight: 1.6 }}>
          {label}
        </a>
      ))}
    </div>
  );
}

function NotesIndicator({ progress, problemId }) {
  if (!progress[problemId]?.notes?.trim()) return null;
  return <span title="Has notes" style={{ fontSize: 12, flexShrink: 0 }}>📝</span>;
}

function PatternTags({ tags }) {
  if (!tags || !tags.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {tags.map(t => (
        <span key={t} style={{ color: "#58A6FF", background: "rgba(88,166,255,.12)", border: "1px solid rgba(88,166,255,.25)", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 600 }}>{t}</span>
      ))}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <motion.div
      variants={fadeSlideUp}
      whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.4), 0 0 0 1px rgba(167,139,250,0.08)" }}
      transition={cardHoverTransition}
      style={{
        background: "#0D1117", border: "1px solid #21262D", borderRadius: 12, padding: 20,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{children}</div>;
}

// ════════════════════════════════════════════════════════════════════════════
// SOCIAL PLATFORM ICONS (official-style SVG marks) + CONFIG
// ════════════════════════════════════════════════════════════════════════════
function SocialIcon({ platform, size = 18, color = "currentColor" }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: color, xmlns: "http://www.w3.org/2000/svg" };
  switch (platform) {
    case "github":
      return (
        <svg {...common}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.58 0-.287-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.756-1.332-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.835 2.808 1.305 3.49.997.108-.776.41-1.305.745-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.47-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.323 3.302 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.292-1.552 3.298-1.23 3.298-1.23.654 1.653.243 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.805 5.624-5.476 5.92.43.37.814 1.103.814 2.222 0 1.606-.015 2.9-.015 3.293 0 .32.216.697.825.58C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.554v-5.569c0-1.328-.025-3.036-1.852-3.036-1.853 0-2.136 1.445-2.136 2.94v5.665H9.354V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.07 2.07 0 11.005-4.139 2.07 2.07 0 01-.005 4.139zM7.114 20.45H3.558V9h3.556v11.45zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "leetcode":
      return (
        <svg {...common}>
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382H10.617z" />
        </svg>
      );
    case "gfg":
      return (
        <svg {...common}>
          <path d="M12.974 1.04a.967.967 0 0 0-.973.973v.001a.967.967 0 0 0 .973.972.967.967 0 0 0 .973-.972V2.01a.967.967 0 0 0-.973-.973zM11.026 1.04a.967.967 0 0 0-.973.973v.001a.967.967 0 0 0 .973.972.967.967 0 0 0 .973-.972V2.01a.967.967 0 0 0-.973-.973zM12 4.07c-5.236 0-9.474 1.96-9.474 4.39v10.43c0 2.43 4.238 4.39 9.474 4.39s9.474-1.96 9.474-4.39V8.46c0-2.43-4.238-4.39-9.474-4.39zm0 1.5c4.41 0 7.974 1.49 7.974 2.89s-3.564 2.89-7.974 2.89S4.026 9.86 4.026 8.46 7.59 5.57 12 5.57zm-7.974 5.49c1.49 1.04 4.51 1.78 7.974 1.78s6.484-.74 7.974-1.78v3.05c0 1.4-3.564 2.89-7.974 2.89S4.026 14.41 4.026 13.01v-3.05zm0 5.07c1.49 1.04 4.51 1.78 7.974 1.78s6.484-.74 7.974-1.78v3.3c0 1.4-3.564 2.89-7.974 2.89S4.026 19.93 4.026 18.53v-3.3z" />
        </svg>
      );
    case "codeforces":
      return (
        <svg {...common}>
          <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-6C14.328 1.5 15 2.172 15 3v16.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V3c0-.828.672-1.5 1.5-1.5h3zm9 9c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
        </svg>
      );
    default:
      return null;
  }
}

const SOCIAL_PLATFORMS = [
  { key: "github", label: "GitHub", color: "#9CA3AF", glow: "rgba(156,163,175,0.35)" },
  { key: "linkedin", label: "LinkedIn", color: "#0A66C2", glow: "rgba(10,102,194,0.4)" },
  { key: "leetcode", label: "LeetCode", color: "#FFA116", glow: "rgba(255,161,22,0.4)" },
  { key: "gfg", label: "GeeksforGeeks", color: "#2EC866", glow: "rgba(46,200,102,0.4)" },
  { key: "codeforces", label: "Codeforces", color: "#A78BFA", glow: "rgba(167,139,250,0.4)" },
];

function SocialCard({ platform, username, url, editing, onChangeUsername }) {
  const [hover, setHover] = useState(false);
  const cfg = SOCIAL_PLATFORMS.find(p => p.key === platform);
  const hasValue = !!(username && username.trim());

  const cardStyle = {
    display: "flex", alignItems: "center", gap: 12,
    padding: "11px 13px", borderRadius: 10,
    border: `1px solid ${hover && hasValue ? cfg.color + "70" : "#21262D"}`,
    background: hover && hasValue ? `${cfg.color}10` : "#0D1117",
    transition: "all 0.2s ease",
    transform: hover && hasValue ? "translateY(-2px)" : "translateY(0)",
    boxShadow: hover && hasValue ? `0 6px 18px ${cfg.glow}` : "none",
    cursor: hasValue && !editing ? "pointer" : "default",
    position: "relative",
    textDecoration: "none",
  };

  const inner = (
    <>
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: `${cfg.color}16`, border: `1px solid ${cfg.color}35`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: cfg.color,
      }}>
        <SocialIcon platform={platform} size={17} color={cfg.color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#E6EDF3" }}>{cfg.label}</div>
        {editing ? (
          <input
            value={username || ""}
            onChange={e => onChangeUsername(e.target.value)}
            placeholder="username"
            onClick={e => e.stopPropagation()}
            style={{ marginTop: 3, width: "100%", background: "#161B22", border: "1px solid #30363D", borderRadius: 6, color: "#C9D1D9", fontSize: 11.5, padding: "4px 8px", outline: "none" }}
          />
        ) : (
          <div style={{ fontSize: 11.5, color: hasValue ? "#8B949E" : "#484F58", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {hasValue ? username : "Not Added"}
          </div>
        )}
      </div>
      {hasValue && !editing && (
        <span style={{ fontSize: 11, color: cfg.color, opacity: hover ? 1 : 0, transition: "opacity 0.2s ease", flexShrink: 0 }}>↗</span>
      )}
    </>
  );

  if (editing || !hasValue) {
    return <div style={cardStyle}>{inner}</div>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={url}
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {inner}
    </a>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PROFILE MODAL
// ════════════════════════════════════════════════════════════════════════════
function ProfileModal({ isOpen, onClose, progress, activity, profile, onSaveProfile }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  useEffect(() => { setForm(profile); }, [profile]);

  const solved = ALL_PROBLEMS.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const totalRevisions = Object.values(progress).reduce((acc, pr) => acc + (pr.revisionHistory || []).filter(r => r.done).length, 0);
  const streak = computeStreak(activity);
  const records = computePersonalRecords(activity);
  const milestone = getMilestoneData(solved);
  const total = ALL_PROBLEMS.length;

  const AVATAR_COLORS = ["#7C3AED","#06B6D4","#10B981","#F59E0B","#EC4899","#8B5CF6","#22D3EE","#FB923C"];

  const socialLinks = [
    { key: "github", prefix: "https://github.com/" },
    { key: "linkedin", prefix: "https://www.linkedin.com/in/" },
    { key: "leetcode", prefix: "https://leetcode.com/u/" },
    { key: "gfg", prefix: "https://www.geeksforgeeks.org/profile/" },
    { key: "codeforces", prefix: "https://codeforces.com/profile/" },
  ];

  const handleSave = () => { onSaveProfile(form); setEditing(false); };

  const initials = form.name ? form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "?";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalBackdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            padding: 16,
          }} onClick={onClose}>
          <motion.div
            variants={modalPanelVariants}
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto",
              background: "#0D1117", border: "1px solid #30363D", borderRadius: 16,
              boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
            }}>
        {/* Header */}
        <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#E6EDF3" }}>Profile</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #30363D", borderRadius: 8, color: "#8B949E", cursor: "pointer", padding: "4px 10px", fontSize: 13, lineHeight: 1.5 }}>✕</button>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Avatar + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: 68, height: 68, borderRadius: "50%",
                background: `linear-gradient(135deg, ${form.avatarColor}, ${form.avatarColor}88)`,
                border: `2px solid ${form.avatarColor}60`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 700, color: "#fff",
                boxShadow: `0 0 20px ${form.avatarColor}40`,
                flexShrink: 0,
              }}>
                {initials}
              </div>
              {editing && (
                <div style={{ position: "absolute", bottom: -4, right: -4, display: "flex", gap: 3, flexWrap: "wrap", width: 80 }}>
                  {AVATAR_COLORS.map(c => (
                    <button key={c} onClick={() => setForm(f => ({ ...f, avatarColor: c }))}
                      style={{ width: 14, height: 14, borderRadius: "50%", background: c, border: c === form.avatarColor ? "2px solid #fff" : "2px solid transparent", cursor: "pointer", padding: 0 }} />
                  ))}
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {editing ? (
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{ background: "#161B22", border: "1px solid #30363D", borderRadius: 8, color: "#E6EDF3", fontSize: 16, fontWeight: 700, padding: "6px 10px", width: "100%", outline: "none" }} />
              ) : (
                <div style={{ fontSize: 18, fontWeight: 700, color: "#E6EDF3" }}>{form.name || "Unnamed Coder"}</div>
              )}
              {editing ? (
                <input value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                  placeholder="Your current goal…"
                  style={{ background: "#161B22", border: "1px solid #30363D", borderRadius: 8, color: "#8B949E", fontSize: 12, padding: "4px 10px", width: "100%", outline: "none", marginTop: 6 }} />
              ) : (
                <div style={{ fontSize: 12, color: "#8B949E", marginTop: 3 }}>🎯 {form.goal || "Set your goal"}</div>
              )}
            </div>
            <button onClick={() => editing ? handleSave() : setEditing(true)}
              style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: `1px solid ${editing ? "#3FB95040" : "#A78BFA40"}`, background: editing ? "rgba(63,185,80,.12)" : "rgba(167,139,250,.12)", color: editing ? "#3FB950" : "#A78BFA", whiteSpace: "nowrap", flexShrink: 0 }}>
              {editing ? "Save" : "Edit"}
            </button>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Problems Solved", value: solved, color: "#3FB950", icon: "✓" },
              { label: "Revisions Done", value: totalRevisions, color: "#A78BFA", icon: "✦" },
              { label: "Current Streak", value: `${streak}d`, color: "#F59E0B", icon: "🔥" },
              { label: "Best Streak", value: `${records.longestStreak}d`, color: "#22D3EE", icon: "⚡" },
            ].map(stat => (
              <div key={stat.label} style={{ padding: "12px 14px", background: "#161B22", borderRadius: 10, border: "1px solid #21262D" }}>
                <div style={{ fontSize: 10, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{stat.icon} {stat.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: stat.color, fontFamily: "monospace" }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div style={{ background: "#161B22", borderRadius: 10, border: "1px solid #21262D", padding: 14 }}>
            <div style={{ fontSize: 11, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>Milestones</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              {MILESTONES.map((m, i) => {
                const unlocked = solved >= m.threshold;
                const isCurrent = unlocked && milestone.current?.id === m.id;
                return (
                  <motion.div key={m.id} title={`${m.label}: ${m.threshold} problems`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isCurrent
                      ? { opacity: 1, scale: 1, boxShadow: [`0 0 4px ${m.glow}`, `0 0 16px ${m.glow}`, `0 0 4px ${m.glow}`] }
                      : { opacity: 1, scale: 1, boxShadow: "0 0 0px rgba(0,0,0,0)" }
                    }
                    transition={isCurrent
                      ? { opacity: { duration: 0.25, delay: i * 0.05 }, scale: { duration: 0.25, delay: i * 0.05 }, boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }
                      : { duration: 0.25, delay: i * 0.05 }
                    }
                    style={{
                      padding: "6px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                      border: `1px solid ${unlocked ? m.color + "60" : "#21262D"}`,
                      background: unlocked ? `${m.color}12` : "#0D1117",
                      color: unlocked ? m.color : "#484F58",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                    <span style={{ fontSize: 14 }}>{m.emoji}</span>
                    {m.label}
                    {unlocked && <span style={{ opacity: 0.7 }}>✓</span>}
                  </motion.div>
                );
              })}
            </div>
            {milestone.next && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: "#8B949E" }}>
                    Next: <span style={{ color: milestone.next.color, fontWeight: 600 }}>{milestone.next.emoji} {milestone.next.label}</span>
                  </span>
                  <span style={{ color: "#8B949E", fontFamily: "monospace" }}>{solved} / {milestone.next.threshold}</span>
                </div>
                <ProgressBar value={solved - (milestone.current?.threshold || 0)} max={milestone.next.threshold - (milestone.current?.threshold || 0)} color={milestone.next.color} height={6} animate />
                <div style={{ fontSize: 11, color: "#484F58", marginTop: 4 }}>{milestone.next.threshold - solved} more to unlock {milestone.next.label}</div>
              </div>
            )}
            {!milestone.next && (
              <div style={{ textAlign: "center", color: "#A78BFA", fontSize: 13, fontWeight: 600 }}>👑 All milestones unlocked! You're a Legend!</div>
            )}
          </div>

          {/* Connect — Social Links */}
          <div style={{ background: "#161B22", borderRadius: 10, border: "1px solid #21262D", padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em" }}>Connect</div>
              {!editing && (
                <span style={{ fontSize: 10, color: "#484F58" }}>Click a card to visit profile</span>
              )}
            </div>
            <div className="social-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {socialLinks.map(({ key, prefix }) => (
                <SocialCard
                  key={key}
                  platform={key}
                  username={form[key]}
                  url={form[key] ? `${prefix}${form[key]}` : null}
                  editing={editing}
                  onChangeUsername={(val) => setForm(f => ({ ...f, [key]: val }))}
                />
              ))}
            </div>
          </div>

          {/* Progress toward total */}
          <div style={{ background: "#161B22", borderRadius: 10, border: "1px solid #21262D", padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: "#8B949E" }}>Sheet Progress</span>
              <span style={{ fontSize: 12, fontFamily: "monospace", color: "#A78BFA" }}>{solved} / {total} ({Math.round((solved / total) * 100)}%)</span>
            </div>
            <ProgressBar value={solved} max={total} color="#A78BFA" height={6} animate />
          </div>
        </div>
      </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MOTIVATION CARD
// ════════════════════════════════════════════════════════════════════════════
function MotivationCard({ style }) {
  const quote = useMemo(() => getDailyQuote(), []);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [quoteKey, setQuoteKey] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => { setQuoteKey(k => k + 1); }, [quote.text]);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div
      style={{
        borderRadius: 12, border: "1px solid #21262D",
        position: "relative", display: "flex", flexDirection: "column",
        justifyContent: "center",
        minHeight: 280, background: "#0D1117",
        transition: "transform 0.25s ease, box-shadow 0.3s ease",
        isolation: "isolate",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 10px 36px rgba(167,139,250,0.18), 0 8px 28px rgba(0,0,0,0.45)" : "none",
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Subtle purple glow */}
      <div style={{
        position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)",
        width: "70%", height: "60%",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Quote section */}
      <div
        key={quoteKey}
        style={{
          position: "relative", padding: "36px 36px 32px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          display: "flex", flexDirection: "column", gap: 20,
        }}
      >
        {/* Quote mark */}
        <div style={{ fontSize: 72, lineHeight: 0.6, color: "#A78BFA", opacity: 0.55, fontFamily: "Georgia, serif", userSelect: "none" }}>"</div>

        {/* Quote text — large and prominent */}
        <blockquote style={{
          fontSize: 22, fontWeight: 700, color: "#E6EDF3", lineHeight: 1.55,
          letterSpacing: "-0.02em", margin: 0, fontStyle: "normal",
        }}>
          {quote.text}
        </blockquote>

        {/* Author + date row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 2, background: "linear-gradient(90deg, #A78BFA, #7C3AED)", borderRadius: 1 }} />
            <span style={{ fontSize: 13, color: "#8B949E", fontWeight: 600 }}>{quote.author}</span>
          </div>
          <span style={{ fontSize: 11, color: "#484F58", fontFamily: "monospace" }}>{today}</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// RADIAL RING
// ════════════════════════════════════════════════════════════════════════════
function RadialRing({ pct, size = 140, stroke = 10, color = "#A78BFA", animate = false }) {
  const [displayPct, setDisplayPct] = useState(animate ? 0 : pct);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setDisplayPct(pct), 150);
    return () => clearTimeout(t);
  }, [pct, animate]);

  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (displayPct / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dasharray 1.4s cubic-bezier(0.22,1,0.36,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 24, fontWeight: 700, color, fontFamily: "monospace" }}>{displayPct}%</span>
        <span style={{ fontSize: 10, color: "#8B949E", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>done</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// DANGER ZONE CARD
// ════════════════════════════════════════════════════════════════════════════
function DangerZoneCard({ progress, onSelectProblem }) {
  const danger = useMemo(() => getDangerZone(progress), [progress]);
  if (danger.length === 0) return null;
  return (
    <Card style={{ border: "1px solid #F8514940", background: "rgba(248,81,73,.05)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#F85149", textTransform: "uppercase", letterSpacing: "0.08em" }}>🚨 Danger Zone</div>
        <span style={{ fontSize: 11, fontFamily: "monospace", background: "rgba(248,81,73,.15)", color: "#F85149", padding: "2px 8px", borderRadius: 99 }}>
          {danger.length} Problem{danger.length === 1 ? "" : "s"} Need Attention
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {danger.slice(0, 8).map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#161B22", borderRadius: 8, border: "1px solid #F8514926" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: "#C9D1D9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
              <div style={{ fontSize: 11, color: "#8B949E", marginTop: 2 }}>{p.subtopicTitle}</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#F85149", fontFamily: "monospace", whiteSpace: "nowrap" }}>{p.daysSince} days ago</span>
            <button onClick={() => onSelectProblem(p)}
              style={{ padding: "6px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", border: "1px solid #F8514950", background: "rgba(248,81,73,.12)", color: "#F85149", whiteSpace: "nowrap", flexShrink: 0 }}>
              Review Now
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PERSONAL RECORDS CARD
// ════════════════════════════════════════════════════════════════════════════
function PersonalRecordsCard({ activity }) {
  const records = useMemo(() => computePersonalRecords(activity), [activity]);
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  return (
    <Card>
      <SectionTitle>Personal Records</SectionTitle>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 200px", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "#161B22", borderRadius: 10, border: "1px solid #21262D" }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>🏆</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Most Solved in a Day</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#E3B341", fontFamily: "monospace", lineHeight: 1.2 }}>{records.bestCount} {records.bestCount === 1 ? "problem" : "problems"}</div>
            <div style={{ fontSize: 12, color: "#8B949E", marginTop: 2 }}>{records.bestDay ? `on ${formatDate(records.bestDay)}` : "No activity yet"}</div>
          </div>
        </div>
        <div style={{ flex: "1 1 200px", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "#161B22", borderRadius: 10, border: "1px solid #21262D" }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>🔥</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Longest Streak</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#F59E0B", fontFamily: "monospace", lineHeight: 1.2 }}>{records.longestStreak} {records.longestStreak === 1 ? "day" : "days"}</div>
            <div style={{ fontSize: 12, color: "#8B949E", marginTop: 2 }}>{records.longestStreak > 0 ? "Consecutive days with activity" : "Start your streak today"}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SUMMARY CARD
// ════════════════════════════════════════════════════════════════════════════
function SummaryCard({ progress, activity }) {
  const [range, setRange] = useState("week");
  const days = range === "week" ? 7 : 30;
  const summary = useMemo(() => computeSummary(progress, activity, days), [progress, activity, days]);
  const tabBtn = (key, label) => (
    <button onClick={() => setRange(key)}
      style={{ padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", border: `1px solid ${range === key ? "#A78BFA60" : "#21262D"}`, background: range === key ? "rgba(167,139,250,.12)" : "#161B22", color: range === key ? "#A78BFA" : "#8B949E" }}>
      {label}
    </button>
  );
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <SectionTitle>{range === "week" ? "Weekly Summary" : "Monthly Summary"}</SectionTitle>
        <div style={{ display: "flex", gap: 6 }}>{tabBtn("week", "7 Days")}{tabBtn("month", "30 Days")}</div>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        {[
          { label: "Solved", val: summary.solvedCount, color: "#3FB950" },
          { label: "Revised", val: summary.revisedCount, color: "#A78BFA" },
          { label: "Active Solves", val: summary.totalActivity, color: "#F59E0B" },
          { label: "Avg / Day", val: summary.dailyAvg, color: "#58A6FF" },
        ].map(x => (
          <div key={x.label} style={{ flex: "1 1 100px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: x.color, fontFamily: "monospace" }}>{x.val}</div>
            <div style={{ fontSize: 11, color: "#8B949E", marginTop: 2 }}>{x.label}</div>
          </div>
        ))}
      </div>
      {summary.solvedCount > 0 && (
        <div style={{ marginBottom: summary.focusTopic ? 12 : 0 }}>
          <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 6 }}>New solves by difficulty</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Easy", "Medium", "Hard"].map(d => summary.byDifficulty[d] > 0 && (
              <span key={d} style={{ color: DC(d), background: DB(d), padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600 }}>{d}: {summary.byDifficulty[d]}</span>
            ))}
          </div>
        </div>
      )}
      {summary.focusTopic && (
        <div style={{ fontSize: 12, color: "#8B949E" }}>
          Focus area: <span style={{ color: "#E6EDF3", fontWeight: 600 }}>{summary.focusTopic.replace(/^Step \d+:\s*/, "")}</span>
          {" "}<span style={{ fontFamily: "monospace", color: "#A78BFA" }}>({summary.focusCount} solved)</span>
        </div>
      )}
      {summary.solvedCount === 0 && summary.revisedCount === 0 && (
        <p style={{ fontSize: 13, color: "#484F58", textAlign: "center", padding: "8px 0", margin: 0 }}>No activity in the last {days} days yet — get solving! 💪</p>
      )}
    </Card>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// HEATMAP
// ════════════════════════════════════════════════════════════════════════════
function GithubHeatmap({ activity }) {
  const [tip, setTip] = useState(null);
  const cellSize = 11, gap = 2;
  const heatmap = useMemo(() => buildHeatmap(activity), [activity]);
  const monthLabels = useMemo(() => getMonthLabels(heatmap), [heatmap]);
  return (
    <div style={{ overflowX: "auto", position: "relative" }}>
      <div style={{ display: "flex", paddingLeft: 28, marginBottom: 4 }}>
        {heatmap.map((wk, wi) => {
          const label = monthLabels.find(l => l.wi === wi);
          return <div key={wi} style={{ flexShrink: 0, width: cellSize + gap, fontSize: 10, color: "#8B949E" }}>{label ? MONTHS[label.m] : ""}</div>;
        })}
      </div>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap, marginRight: 4, width: 24 }}>
          {DAYS.map((d, i) => (
            <div key={d} style={{ height: cellSize, fontSize: 9, color: "#8B949E", lineHeight: `${cellSize}px`, visibility: i % 2 === 1 ? "visible" : "hidden" }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "flex", gap }}>
          {heatmap.map((wk, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap }}>
              {wk.map((day, di) => (
                <div key={di}
                  style={{ width: cellSize, height: cellSize, borderRadius: 2, background: heatCol(day.count, day.isFuture), border: day.isFuture ? "none" : "1px solid rgba(255,255,255,0.03)", cursor: day.isFuture ? "default" : "pointer", flexShrink: 0 }}
                  onMouseEnter={e => { if (!day.isFuture) { const r = e.currentTarget.getBoundingClientRect(); setTip({ x: r.left, y: r.top, ...day }); } }}
                  onMouseLeave={() => setTip(null)} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, justifyContent: "flex-end" }}>
        <span style={{ fontSize: 10, color: "#8B949E" }}>Less</span>
        {[0, 2, 4, 6, 9].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: 2, background: heatCol(c, false), border: "1px solid rgba(255,255,255,0.03)" }} />)}
        <span style={{ fontSize: 10, color: "#8B949E" }}>More</span>
      </div>
      {tip && (
        <div style={{ position: "fixed", left: tip.x - 36, top: tip.y - 50, background: "#1C2128", border: "1px solid #30363D", borderRadius: 6, padding: "6px 10px", fontSize: 11, color: "#E6EDF3", pointerEvents: "none", zIndex: 999, boxShadow: "0 4px 12px rgba(0,0,0,.4)" }}>
          <div style={{ fontWeight: 600 }}>{tip.count} problem{tip.count !== 1 ? "s" : ""}</div>
          <div style={{ color: "#8B949E" }}>{tip.date}</div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════════════════
function Dashboard({ progress, activity, settings, onSetDailyGoal, onNavigate, onImport, onSelectProblem, onQuickPractice }) {
  const solved = ALL_PROBLEMS.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const total = ALL_PROBLEMS.length;
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  const easy = ALL_PROBLEMS.filter(p => p.difficulty === "Easy");
  const medium = ALL_PROBLEMS.filter(p => p.difficulty === "Medium");
  const hard = ALL_PROBLEMS.filter(p => p.difficulty === "Hard");
  const eS = easy.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const mS = medium.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const hS = hard.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const today = todayKey();
  const solvedToday = Object.values(progress).filter(v => v.lastSolved === today).length;
  const revisedToday = Object.values(progress).filter(v => (v.revisionHistory || []).some(r => r.done && r.doneDate === today)).length;
  const GOAL = settings.dailyGoal;
  const streak = computeStreak(activity);

  const solvedCount = useCountUp(solved, 1000, true);
  const todayCount = useCountUp(solvedToday, 800, true);
  const revisedCount = useCountUp(revisedToday, 800, true);
  const streakCount = useCountUp(streak, 800, true);

  const revQueue = ALL_PROBLEMS.filter(p => {
    const pr = progress[p.id];
    if (!pr || !(pr.revisionHistory || []).length) return false;
    return pr.revisionHistory.some(r => !r.done && r.dueDate <= today);
  });

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <PersonalRecordsCard activity={activity} />

      {/* ── Two-column layout ── */}
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Left: Overall Progress */}
        <Card style={{ gridColumn: "1 / 2" }}>
          <SectionTitle>Overall Progress</SectionTitle>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <RadialRing pct={pct} animate />
            <div style={{ flex: 1, minWidth: 160, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 13, color: "#8B949E" }}>
                <span style={{ fontSize: 26, fontWeight: 700, color: "#E6EDF3", fontFamily: "monospace" }}>{solvedCount}</span>
                {" "}<span>/ {total} problems solved</span>
              </div>
              {[
                { label: "Easy", s: eS, t: easy.length, color: "#3FB950" },
                { label: "Medium", s: mS, t: medium.length, color: "#E3B341" },
                { label: "Hard", s: hS, t: hard.length, color: "#F85149" },
              ].map(x => (
                <div key={x.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: x.color, fontWeight: 600 }}>{x.label}</span>
                    <span style={{ fontSize: 12, color: "#8B949E", fontFamily: "monospace" }}>{x.s} / {x.t}</span>
                  </div>
                  <ProgressBar value={x.s} max={x.t} color={x.color} height={5} animate />
                </div>
              ))}
              <div style={{ borderTop: "1px solid #21262D", paddingTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, gap: 8 }}>
                  <span style={{ fontSize: 12, color: "#8B949E" }}>Daily Goal</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => onSetDailyGoal(GOAL - 1)} style={{ width: 20, height: 20, borderRadius: 5, border: "1px solid #21262D", background: "#161B22", color: "#8B949E", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>−</button>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: "#A78BFA", minWidth: 36, textAlign: "center" }}>{solvedToday} / {GOAL}</span>
                    <button onClick={() => onSetDailyGoal(GOAL + 1)} style={{ width: 20, height: 20, borderRadius: 5, border: "1px solid #21262D", background: "#161B22", color: "#8B949E", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>+</button>
                  </div>
                </div>
                <ProgressBar value={solvedToday} max={GOAL} color="#A78BFA" height={5} animate />
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Motivation Card */}
        <MotivationCard style={{ gridColumn: "2 / 3" }} />
      </div>

      {/* Stats strip */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { icon: "🔥", val: streakCount, suffix: streak === 1 ? " Day Streak" : " Day Streak", color: "#F59E0B" },
          { icon: "✓", val: todayCount, suffix: " Solved Today", color: "#3FB950" },
          { icon: "✦", val: revisedCount, suffix: " Revised Today", color: "#A78BFA" },
        ].map(({ icon, val, suffix, color }) => (
          <Card key={suffix} style={{ flex: "1 1 140px", textAlign: "center", padding: "14px 12px" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color, fontFamily: "monospace" }}>{icon} {val}</div>
            <div style={{ fontSize: 11, color: "#8B949E", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{suffix}</div>
          </Card>
        ))}
      </div>

      <SummaryCard progress={progress} activity={activity} />
      <DangerZoneCard progress={progress} onSelectProblem={onSelectProblem} />

      {/* Quick Practice */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>🎲 Quick Practice</div>
            <div style={{ fontSize: 13, color: "#C9D1D9" }}>Generate Random 5 Questions</div>
          </div>
          <button onClick={onQuickPractice} style={{ padding: "9px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #A78BFA40", background: "rgba(167,139,250,.12)", color: "#A78BFA", whiteSpace: "nowrap" }}>
            🎲 Generate Practice Set
          </button>
        </div>
      </Card>

      {/* Revision Queue */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <SectionTitle>Revision Due Today</SectionTitle>
          <span style={{ fontSize: 11, fontFamily: "monospace", background: "rgba(167,139,250,.12)", color: "#A78BFA", padding: "2px 8px", borderRadius: 99 }}>{revQueue.length} due</span>
        </div>
        {revQueue.length === 0
          ? <p style={{ fontSize: 13, color: "#484F58", textAlign: "center", padding: "16px 0" }}>No revisions due — keep solving! 🔥</p>
          : revQueue.slice(0, 5).map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#161B22", borderRadius: 8, border: "1px solid #21262D", marginBottom: 6 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
                  <span style={{ fontSize: 13, color: "#C9D1D9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                  <NotesIndicator progress={progress} problemId={p.id} />
                </div>
                <div style={{ fontSize: 11, color: "#8B949E", marginTop: 2 }}>{p.subtopicTitle}</div>
              </div>
              <DiffBadge d={p.difficulty} />
              <LinkPills p={p} />
            </div>
          ))
        }
      </Card>

      {/* Topic Progress */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <SectionTitle>Topic Progress</SectionTitle>
          <button onClick={() => onNavigate("roadmap")} style={{ fontSize: 12, color: "#A78BFA", background: "none", border: "none", cursor: "pointer" }}>View Roadmap →</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SHEET.map(step => {
            const probs = step.subtopics.flatMap(s => s.problems);
            const s = probs.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
            const t = probs.length;
            return (
              <div key={step.stepId}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "#C9D1D9", fontWeight: 500 }}>{step.stepTitle}</span>
                  <span style={{ fontSize: 12, fontFamily: "monospace", color: step.color }}>{s}/{t}</span>
                </div>
                <ProgressBar value={s} max={t} color={step.color} height={5} animate />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Heatmap */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <SectionTitle>Activity — Last 12 Months</SectionTitle>
        </div>
        <GithubHeatmap activity={activity} />
      </Card>

      {/* Backup */}
      <Card>
        <SectionTitle>Local Backup</SectionTitle>
        <p style={{ fontSize: 12, color: "#8B949E", marginBottom: 12 }}>Export your progress as JSON, or restore from a previous backup.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => exportProgress(progress, activity)} style={{ padding: "9px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #A78BFA40", background: "rgba(167,139,250,.12)", color: "#A78BFA" }}>⬇ Export Progress</button>
          <label style={{ padding: "9px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #21262D", background: "#161B22", color: "#8B949E" }}>
            ⬆ Import Progress
            <input type="file" accept="application/json" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) onImport(f); e.target.value = ""; }} />
          </label>
        </div>
      </Card>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ROADMAP
// ════════════════════════════════════════════════════════════════════════════
function Roadmap({ progress, onSelectProblem }) {
  const initExp = {};
  SHEET.forEach(st => {
    initExp[st.stepId] = true;
    st.subtopics.forEach(sub => { initExp[sub.id] = false; });
  });
  const [exp, setExp] = useState(initExp);
  const toggle = id => setExp(e => ({ ...e, [id]: !e[id] }));

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>A2Z DSA Roadmap</h2>
      <p style={{ fontSize: 13, color: "#8B949E", marginBottom: 16 }}>Striver's structured path — {SHEET.map(s => s.stepTitle.replace(/^Step \d+:\s*/, "")).join(" → ")}</p>
      {SHEET.map((step, si) => {
        const allP = step.subtopics.flatMap(s => s.problems);
        const sv = allP.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
        const tot = allP.length;
        const open = exp[step.stepId];
        return (
          <div key={step.stepId} style={{ border: "1px solid #21262D", borderRadius: 12, overflow: "hidden", background: "#0D1117", marginBottom: 10 }}>
            <button onClick={() => toggle(step.stepId)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, fontFamily: "monospace", flexShrink: 0, background: `${step.color}16`, color: step.color, border: `1px solid ${step.color}30` }}>{si + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#E6EDF3" }}>{step.stepTitle}</span>
                  <span style={{ fontSize: 12, fontFamily: "monospace", color: step.color, flexShrink: 0, marginLeft: 8 }}>{sv}/{tot}</span>
                </div>
                <ProgressBar value={sv} max={tot} color={step.color} height={3} />
              </div>
              <span style={{ color: "#484F58", fontSize: 12, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s", flexShrink: 0 }}>▼</span>
            </button>
            {open && (
              <div style={{ borderTop: "1px solid #21262D" }}>
                {step.subtopics.map(sub => {
                  const subSv = sub.problems.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
                  const subTot = sub.problems.length;
                  const subOpen = exp[sub.id];
                  return (
                    <div key={sub.id} style={{ borderBottom: "1px solid #161B22" }}>
                      <button onClick={() => toggle(sub.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: step.color, opacity: .5, flexShrink: 0 }} />
                        <span style={{ flex: 1, fontSize: 13, color: "#C9D1D9" }}>{sub.title}</span>
                        <span style={{ fontSize: 11, fontFamily: "monospace", color: "#8B949E", marginRight: 8 }}>{subSv}/{subTot}</span>
                        <div style={{ width: 64 }}><ProgressBar value={subSv} max={subTot} color={step.color} height={3} /></div>
                        <span style={{ color: "#484F58", fontSize: 11, marginLeft: 8, transform: subOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s", flexShrink: 0 }}>▼</span>
                      </button>
                      {subOpen && (
                        <div style={{ margin: "0 12px 10px", borderRadius: 8, border: "1px solid #21262D", overflow: "hidden", background: "#161B22" }}>
                          {sub.problems.map((p, pi) => {
                            const st = progress[p.id]?.status || "Not Started";
                            const isDone = ["Solved", "Revised"].includes(st);
                            return (
                              <div key={p.id} onClick={() => onSelectProblem(p)}
                                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: pi < sub.problems.length - 1 ? "1px solid #21262D" : "none", cursor: "pointer" }}
                                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.02)"}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                                <div style={{ width: 18, height: 18, borderRadius: 4, border: `1px solid ${isDone ? SC(st) : "#30363D"}`, background: isDone ? `${SC(st)}18` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  {isDone && <span style={{ color: SC(st), fontSize: 10 }}>✓</span>}
                                </div>
                                <span style={{ fontSize: 11, color: "#484F58", fontFamily: "monospace", width: 20, flexShrink: 0 }}>{String(pi + 1).padStart(2, "0")}</span>
                                <span style={{ flex: 1, fontSize: 13, color: "#C9D1D9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                                <NotesIndicator progress={progress} problemId={p.id} />
                                <DiffBadge d={p.difficulty} />
                                <LinkPills p={p} />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PROBLEM LIST
// ════════════════════════════════════════════════════════════════════════════
function ProblemList({ progress, onSelect }) {
  const [search, setSearch] = useState("");
  const [diffF, setDiffF] = useState("");
  const [statF, setStatF] = useState("");
  const [stepF, setStepF] = useState("");
  const [tagF, setTagF] = useState("");
  const [sort, setSort] = useState({ key: "id", dir: 1 });

  const steps = [...new Set(ALL_PROBLEMS.map(p => p.stepTitle))];
  const patternTags = [...new Set(ALL_PROBLEMS.flatMap(p => p.patternTags || []))].sort();

  const list = useMemo(() => {
    return ALL_PROBLEMS
      .filter(p => {
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (diffF && p.difficulty !== diffF) return false;
        const st = progress[p.id]?.status || "Not Started";
        if (statF && st !== statF) return false;
        if (stepF && p.stepTitle !== stepF) return false;
        if (tagF && !(p.patternTags || []).includes(tagF)) return false;
        return true;
      })
      .sort((a, b) => {
        let av = sort.key === "status" ? (progress[a.id]?.status || "Not Started") : a[sort.key];
        let bv = sort.key === "status" ? (progress[b.id]?.status || "Not Started") : b[sort.key];
        return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir;
      });
  }, [search, diffF, statF, stepF, tagF, sort, progress]);

  const SH = ({ k, label, w }) => (
    <th onClick={() => setSort(s => ({ key: k, dir: s.key === k ? -s.dir : 1 }))}
      style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em", cursor: "pointer", whiteSpace: "nowrap", width: w }}>
      {label} {sort.key === k && <span style={{ color: "#A78BFA" }}>{sort.dir > 0 ? "↑" : "↓"}</span>}
    </th>
  );

  const selStyle = { background: "#161B22", border: "1px solid #30363D", color: "#C9D1D9", padding: "6px 10px", borderRadius: 8, fontSize: 12, outline: "none" };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#484F58", fontSize: 13 }}>⌕</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search problems…"
            style={{ width: "100%", paddingLeft: 28, paddingRight: 12, paddingTop: 7, paddingBottom: 7, background: "#161B22", border: "1px solid #30363D", borderRadius: 8, color: "#C9D1D9", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
        </div>
        <select value={diffF} onChange={e => setDiffF(e.target.value)} style={selStyle}><option value="">Difficulty</option>{["Easy", "Medium", "Hard"].map(o => <option key={o}>{o}</option>)}</select>
        <select value={statF} onChange={e => setStatF(e.target.value)} style={selStyle}><option value="">Status</option>{["Solved", "Revised", "Attempted", "Not Started"].map(o => <option key={o}>{o}</option>)}</select>
        <select value={stepF} onChange={e => setStepF(e.target.value)} style={selStyle}><option value="">Step</option>{steps.map(o => <option key={o}>{o}</option>)}</select>
        {patternTags.length > 0 && <select value={tagF} onChange={e => setTagF(e.target.value)} style={selStyle}><option value="">Pattern</option>{patternTags.map(o => <option key={o}>{o}</option>)}</select>}
        {(search || diffF || statF || stepF || tagF) && <button onClick={() => { setSearch(""); setDiffF(""); setStatF(""); setStepF(""); setTagF(""); }} style={{ ...selStyle, cursor: "pointer", color: "#8B949E" }}>✕ Clear</button>}
        <span style={{ fontSize: 12, color: "#8B949E", marginLeft: 4 }}>{list.length} problems</span>
      </div>
      <div style={{ border: "1px solid #21262D", borderRadius: 12, overflow: "hidden", background: "#0D1117" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead style={{ background: "#161B22", borderBottom: "1px solid #21262D" }}>
              <tr>
                <SH k="id" label="#" w={48} />
                <SH k="name" label="Problem" w="auto" />
                <SH k="difficulty" label="Difficulty" w={100} />
                <SH k="status" label="Status" w={120} />
                <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em", width: 140 }}>Links</th>
                <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.07em", width: 110 }}>Last Revised</th>
                <SH k="subtopicTitle" label="Section" w={140} />
              </tr>
            </thead>
            <tbody>
              {list.map((p, idx) => {
                const st = progress[p.id]?.status || "Not Started";
                const lastRevised = progress[p.id]?.lastRevised;
                return (
                  <tr key={p.id} onClick={() => onSelect(p)}
                    style={{ borderBottom: "1px solid #21262D", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.018)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "11px 12px", fontSize: 11, color: "#484F58", fontFamily: "monospace" }}>{String(idx + 1).padStart(3, "0")}</td>
                    <td style={{ padding: "11px 12px", fontSize: 13, color: "#C9D1D9" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span>{p.name}</span>
                        <NotesIndicator progress={progress} problemId={p.id} />
                      </div>
                    </td>
                    <td style={{ padding: "11px 12px" }}><DiffBadge d={p.difficulty} /></td>
                    <td style={{ padding: "11px 12px" }}><StatusBadge s={st} /></td>
                    <td style={{ padding: "11px 12px" }}><LinkPills p={p} /></td>
                    <td style={{ padding: "11px 12px", fontSize: 11, fontWeight: 600, color: daysAgoColor(lastRevised) }}>{daysAgoLabel(lastRevised)}</td>
                    <td style={{ padding: "11px 12px", fontSize: 11, color: "#8B949E" }}>{p.subtopicTitle}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {list.length === 0 && <div style={{ textAlign: "center", padding: "40px 0", fontSize: 13, color: "#484F58" }}>No problems match your filters.</div>}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRACTICE MODE
// ════════════════════════════════════════════════════════════════════════════
function PracticeMode({ progress, practice, setPractice, onSelectProblem }) {
  const topics = ["Any", ...SHEET.map(s => s.stepTitle)];
  const [topic, setTopic] = useState("Any");
  const [diffs, setDiffs] = useState(["Any"]);
  const [sources, setSources] = useState([...STATUS_SOURCES]);
  const [count, setCount] = useState(5);

  const selStyle = { background: "#161B22", border: "1px solid #30363D", color: "#C9D1D9", padding: "6px 10px", borderRadius: 8, fontSize: 12, outline: "none" };

  const handleGenerate = () => {
    const questions = generatePracticeSet(progress, { topic, difficulties: diffs, sources, count });
    setPractice({ questionIds: questions.map(q => q.id), completed: {}, createdAt: todayKey(), filters: { topic, diffs, sources, count } });
  };

  const toggleCompleted = (id) => {
    setPractice(p => { if (!p) return p; return { ...p, completed: { ...p.completed, [id]: !p.completed[id] } }; });
  };

  const questions = practice ? practice.questionIds.map(id => ALL_PROBLEMS.find(p => p.id === id)).filter(Boolean) : [];
  const solvedCount = practice ? questions.filter(q => practice.completed[q.id]).length : 0;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#E6EDF3", marginBottom: 4 }}>🎲 Practice Mode</h2>
      <p style={{ fontSize: 13, color: "#8B949E", marginTop: -12 }}>Generate a custom practice session from any topic, difficulty, or progress status.</p>
      <Card>
        <SectionTitle>Build Your Set</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 6 }}>Topic</div>
            <select value={topic} onChange={e => setTopic(e.target.value)} style={{ ...selStyle, width: "100%" }}>
              {topics.map(t => <option key={t} value={t}>{t === "Any" ? "Any Topic" : t.replace(/^Step \d+:\s*/, "")}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 6 }}>Difficulty</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Easy", "Medium", "Hard", "Any"].map(d => {
                const on = diffs.includes(d);
                return (
                  <button key={d} onClick={() => {
                    if (d === "Any") { setDiffs(["Any"]); return; }
                    setDiffs(arr => {
                      const withoutAny = arr.filter(x => x !== "Any");
                      const next = withoutAny.includes(d) ? withoutAny.filter(x => x !== d) : [...withoutAny, d];
                      return next.length ? next : ["Any"];
                    });
                  }}
                    style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${on ? (d === "Any" ? "#A78BFA60" : DC(d) + "60") : "#21262D"}`, background: on ? (d === "Any" ? "rgba(167,139,250,.12)" : DB(d)) : "#161B22", color: on ? (d === "Any" ? "#A78BFA" : DC(d)) : "#8B949E" }}>
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 6 }}>Source</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STATUS_SOURCES.map(s => {
                const on = sources.includes(s);
                return (
                  <button key={s} onClick={() => setSources(arr => arr.includes(s) ? arr.filter(x => x !== s) : [...arr, s])}
                    style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${on ? SC(s) + "60" : "#21262D"}`, background: on ? SB(s) : "#161B22", color: on ? SC(s) : "#8B949E", display: "flex", alignItems: "center", gap: 6 }}>
                    <span>{on ? "☑" : "☐"}</span>{s}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "#8B949E" }}>Number of Questions</span>
              <span style={{ fontSize: 12, fontFamily: "monospace", color: "#A78BFA" }}>{count}</span>
            </div>
            <input type="range" min={1} max={20} value={count} onChange={e => setCount(Number(e.target.value))} style={{ width: "100%", accentColor: "#A78BFA" }} />
          </div>
          <button onClick={handleGenerate} style={{ padding: "11px 0", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "1px solid #A78BFA40", background: "rgba(167,139,250,.12)", color: "#A78BFA" }}>
            {practice ? "🔁 Regenerate" : "Generate Practice Set"}
          </button>
        </div>
      </Card>
      {practice && (
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <SectionTitle>Practice Set</SectionTitle>
            <button onClick={handleGenerate} style={{ fontSize: 12, color: "#A78BFA", background: "none", border: "none", cursor: "pointer" }}>🔁 Regenerate</button>
          </div>
          <div style={{ fontSize: 13, color: "#8B949E", marginBottom: 12 }}>
            {questions.length} Question{questions.length === 1 ? "" : "s"} · Solved: <span style={{ color: "#3FB950", fontFamily: "monospace" }}>{solvedCount} / {questions.length}</span>
          </div>
          <div style={{ marginBottom: 12 }}><ProgressBar value={solvedCount} max={questions.length} color="#3FB950" height={5} /></div>
          {questions.length === 0
            ? <p style={{ fontSize: 13, color: "#484F58", textAlign: "center", padding: "16px 0" }}>No problems match these filters.</p>
            : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {questions.map((p, i) => {
                  const done = !!practice.completed[p.id];
                  return (
                    <motion.div key={p.id}
                      layout
                      animate={{ background: done ? "rgba(63,185,80,0.06)" : "#161B22" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "1px solid #21262D" }}>
                      <span style={{ fontSize: 11, color: "#484F58", fontFamily: "monospace", width: 20, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                      <div style={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={() => onSelectProblem(p)}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
                          <motion.span
                            animate={{ opacity: done ? 0.65 : 1 }}
                            transition={{ duration: 0.25 }}
                            style={{ fontSize: 13, color: done ? "#8B949E" : "#C9D1D9", textDecoration: done ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block" }}>{p.name}</motion.span>
                          <NotesIndicator progress={progress} problemId={p.id} />
                        </div>
                        <div style={{ fontSize: 11, color: "#8B949E", marginTop: 2 }}>{p.subtopicTitle}</div>
                      </div>
                      <DiffBadge d={p.difficulty} />
                      <LinkPills p={p} />
                      <motion.button onClick={() => toggleCompleted(p.id)}
                        whileTap={{ scale: 0.94 }}
                        animate={done ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                        transition={{ duration: 0.28, ease: [0.34, 1.2, 0.64, 1] }}
                        style={{ padding: "6px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", border: `1px solid ${done ? "#3FB95050" : "#21262D"}`, background: done ? "rgba(63,185,80,.12)" : "#0D1117", color: done ? "#3FB950" : "#8B949E", whiteSpace: "nowrap", flexShrink: 0 }}>
                        {done ? "✓ Completed" : "Mark Complete"}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            )
          }
        </Card>
      )}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PROBLEM DETAIL
// ════════════════════════════════════════════════════════════════════════════
function ProblemDetail({ problem, progress, onBack, onUpdate, onActivity }) {
  const pr = progress[problem.id] || {};
  const [status, setStatus] = useState(pr.status || "Not Started");
  const [timesSolved, setTimesSolved] = useState(pr.timesSolved || 0);
  const [tags, setTags] = useState(pr.mistakeTags || []);
  const [notes, setNotes] = useState(pr.notes || "");
  const [saved, setSaved] = useState(false);
  const [revCompleted, setRevCompleted] = useState(null);

  const STATUSES = ["Not Started", "Attempted", "Solved", "Revised"];
  const MTAGS = ["Logic Error", "Edge Case", "Time Complexity", "Space Complexity", "Syntax Error"];

  const handleSave = () => {
    const today = todayKey();
    const wasDone = ["Solved", "Revised"].includes(pr.status);
    const isDone = ["Solved", "Revised"].includes(status);
    let revisionHistory = pr.revisionHistory || [];
    let lastSolved = pr.lastSolved;
    if (isDone && !wasDone) {
      lastSolved = today;
      revisionHistory = buildRevisionHistory(today);
      onActivity(today, 1);
    } else if (!isDone) {
      revisionHistory = [];
    }
    onUpdate(problem.id, { status, timesSolved, mistakeTags: tags, notes, lastSolved, revisionHistory });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const markRevisionDone = (stage) => {
    const today = todayKey();
    const revisionHistory = (pr.revisionHistory || []).map(r => r.stage === stage ? { ...r, done: true, doneDate: today } : r);
    onUpdate(problem.id, { revisionHistory, lastRevised: today });
    onActivity(today, 1);
    setRevCompleted(stage);
    setTimeout(() => setRevCompleted(null), 2000);
  };

  const inputStyle = { background: "#161B22", border: "1px solid #21262D", borderRadius: 8, color: "#C9D1D9", fontSize: 13, padding: "10px 12px", outline: "none", width: "100%", boxSizing: "border-box" };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#8B949E", background: "none", border: "none", cursor: "pointer", padding: 0 }}>← Back</button>
      <Card>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#E6EDF3", flex: 1, margin: 0, lineHeight: 1.3 }}>{problem.name}</h1>
          <DiffBadge d={problem.difficulty} />
        </div>
        <div style={{ fontSize: 12, color: "#8B949E", marginBottom: 12 }}>{problem.subtopicTitle} · {problem.stepTitle}</div>
        <LinkPills p={problem} />
        {problem.patternTags && problem.patternTags.length > 0 && <div style={{ marginTop: 12 }}><PatternTags tags={problem.patternTags} /></div>}
      </Card>
      <Card>
        <SectionTitle>Status</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {STATUSES.map(s => (
            <motion.button key={s} onClick={() => setStatus(s)}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
              style={{ padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${status === s ? SC(s) + "60" : "#21262D"}`, background: status === s ? SB(s) : "#161B22", color: status === s ? SC(s) : "#8B949E", transition: "background 0.2s ease, border 0.2s ease, color 0.2s ease" }}>
              {s}
            </motion.button>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>Times Solved</SectionTitle>
        <div style={{ display: "flex", gap: 8 }}>
          {[1, 2, 3, 4].map(n => (
            <button key={n} onClick={() => setTimesSolved(n)}
              style={{ width: 40, height: 36, borderRadius: 8, border: `1px solid ${timesSolved === n ? "#A78BFA60" : "#21262D"}`, background: timesSolved === n ? "rgba(167,139,250,.12)" : "#161B22", color: timesSolved === n ? "#A78BFA" : "#8B949E", fontSize: 13, fontFamily: "monospace", cursor: "pointer" }}>
              {n === 4 ? "4+" : n}
            </button>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>Last Revised</SectionTitle>
        <div style={{ fontSize: 14, fontWeight: 600, color: daysAgoColor(pr.lastRevised) }}>{daysAgoLabel(pr.lastRevised)}</div>
      </Card>
      {(pr.revisionHistory || []).length > 0 && (
        <Card>
          <SectionTitle>Spaced Repetition Schedule</SectionTitle>
          {pr.revisionHistory.map(r => {
            const due = new Date(r.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" });
            const overdue = !r.done && r.dueDate <= todayKey();
            const justDone = revCompleted === r.stage;
            return (
              <motion.div key={r.stage}
                animate={{ background: justDone ? "rgba(63,185,80,0.12)" : "rgba(63,185,80,0)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", fontSize: 13, borderBottom: "1px solid #21262D" }}>
                <span style={{ color: "#8B949E" }}>Revision {r.stage} ({REVISION_OFFSETS[r.stage - 1]} days)</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={r.done ? "done" : "pending"}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, ease: [0.34, 1.2, 0.64, 1] }}
                      style={{ color: r.done ? "#3FB950" : overdue ? "#F85149" : "#A78BFA", fontFamily: "monospace", fontSize: 12, display: "inline-block" }}>
                      {r.done ? `Done ${new Date(r.doneDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : due}
                    </motion.span>
                  </AnimatePresence>
                  {!r.done && (
                    <motion.button onClick={() => markRevisionDone(r.stage)}
                      whileTap={{ scale: 0.93 }}
                      style={{ padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", border: "1px solid #3FB95040", background: "rgba(63,185,80,.1)", color: "#3FB950" }}>
                      Mark Done
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </Card>
      )}
      <Card>
        <SectionTitle>Mistake Tags</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {MTAGS.map(tag => {
            const on = tags.includes(tag);
            return (
              <button key={tag} onClick={() => setTags(t => on ? t.filter(x => x !== tag) : [...t, tag])}
                style={{ padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, cursor: "pointer", border: `1px solid ${on ? "#F8514960" : "#21262D"}`, background: on ? "rgba(248,81,73,.1)" : "#161B22", color: on ? "#F85149" : "#484F58", transition: "all .15s" }}>
                {tag}
              </button>
            );
          })}
        </div>
      </Card>
      <Card>
        <SectionTitle>Personal Notes</SectionTitle>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Your approach, edge cases, key insights…" rows={4} style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
      </Card>
      <motion.button
        onClick={handleSave}
        animate={saved ? { scale: [1, 1.03, 1] } : { scale: 1 }}
        transition={{ duration: 0.32, ease: [0.34, 1.2, 0.64, 1] }}
        style={{ padding: "11px 0", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", border: `1px solid ${saved ? "#3FB95040" : "#A78BFA40"}`, background: saved ? "rgba(63,185,80,.12)" : "rgba(167,139,250,.12)", color: saved ? "#3FB950" : "#A78BFA", transition: "background 0.25s ease, border 0.25s ease, color 0.25s ease" }}>
        {saved ? "✓ Saved" : "Save Progress"}
      </motion.button>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SMART STUDY TIMER
// ════════════════════════════════════════════════════════════════════════════
const TIMER_LS = "smart_study_timer_v2";
const TIMER_STATS_LS = "smart_study_stats_v1";
const BREAK_MINS_CONST = 5;

function buildTimerPhases(totalMins) {
  if (totalMins <= 25) return [{ type: "focus", label: "Focus", duration: totalMins * 60, index: 1, of: 1 }];
  const focusMins = Math.floor((totalMins - BREAK_MINS_CONST) / 2);
  return [
    { type: "focus", label: "Focus", duration: focusMins * 60, index: 1, of: 2 },
    { type: "break", label: "Break", duration: BREAK_MINS_CONST * 60, index: null, of: null },
    { type: "focus", label: "Focus", duration: focusMins * 60, index: 2, of: 2 },
  ];
}

function fmtTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function playTimerBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523, 659, 784].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = f; o.type = "sine";
      g.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
      g.gain.linearRampToValueAtTime(0.25, ctx.currentTime + i * 0.15 + 0.05);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.15 + 0.3);
      o.start(ctx.currentTime + i * 0.15);
      o.stop(ctx.currentTime + i * 0.15 + 0.35);
    });
  } catch (e) {}
}

function loadTimerState() { try { const s = localStorage.getItem(TIMER_LS); return s ? JSON.parse(s) : null; } catch { return null; } }
function saveTimerState(s) { try { localStorage.setItem(TIMER_LS, JSON.stringify(s)); } catch {} }
function loadTimerStats() { try { const s = localStorage.getItem(TIMER_STATS_LS); return s ? JSON.parse(s) : { sessions: 0, xp: 0, streak: 0, lastDate: null }; } catch { return { sessions: 0, xp: 0, streak: 0, lastDate: null }; } }
function saveTimerStats(s) { try { localStorage.setItem(TIMER_STATS_LS, JSON.stringify(s)); } catch {} }
function addTimerSession() {
  const st = loadTimerStats();
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  let streak = st.lastDate === today ? st.streak : st.lastDate === yesterday ? st.streak + 1 : 1;
  const updated = { sessions: st.sessions + 1, xp: st.xp + 50, streak, lastDate: today };
  saveTimerStats(updated);
  return updated;
}

function TimerRing({ progress, type }) {
  const R = 90, cx = 100, cy = 100, C = 2 * Math.PI * R;
  const offset = C - progress * C;
  const color = type === "break" ? "#34d399" : "#8b5cf6";
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 14px ${color}55)` }}>
      <circle cx={cx} cy={cy} r={R} fill="none" strokeWidth="10" stroke="rgba(255,255,255,0.08)" />
      <circle cx={cx} cy={cy} r={R} fill="none" strokeWidth="10" stroke={color}
        strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1), stroke 0.5s" }} />
    </svg>
  );
}

function StudyTimer({ onBumpActivity }) {
  const saved = loadTimerState();
  const [screen, setScreen] = React.useState(saved?.screen || "setup");
  const [inputMins, setInputMins] = React.useState(saved?.inputMins || "45");
  const [phases, setPhases] = React.useState(saved?.phases || []);
  const [phaseIdx, setPhaseIdx] = React.useState(saved?.phaseIdx || 0);
  const [timeLeft, setTimeLeft] = React.useState(saved?.timeLeft || 0);
  const [running, setRunning] = React.useState(false);
  const [timerStats, setTimerStats] = React.useState(loadTimerStats);
  const tickRef = React.useRef(null);
  const prevTimeRef = React.useRef(null);

  React.useEffect(() => {
    saveTimerState({ screen, inputMins, phases, phaseIdx, timeLeft });
  }, [screen, inputMins, phases, phaseIdx, timeLeft]);

  const advance = React.useCallback(() => {
    setPhaseIdx(prev => {
      const next = prev + 1;
      if (next >= phases.length) {
        setRunning(false);
        setScreen("done");
        const updated = addTimerSession();
        setTimerStats(updated);
        if (onBumpActivity) onBumpActivity();
        playTimerBeep();
        return prev;
      }
      setTimeLeft(phases[next].duration);
      playTimerBeep();
      return next;
    });
  }, [phases, onBumpActivity]);

  React.useEffect(() => {
    if (!running) { clearInterval(tickRef.current); return; }
    prevTimeRef.current = Date.now();
    tickRef.current = setInterval(() => {
      const now = Date.now();
      const delta = Math.round((now - prevTimeRef.current) / 1000);
      prevTimeRef.current = now;
      setTimeLeft(t => {
        const next = t - delta;
        if (next <= 0) { clearInterval(tickRef.current); advance(); return 0; }
        return next;
      });
    }, 500);
    return () => clearInterval(tickRef.current);
  }, [running, advance]);

  function startSession() {
    const m = parseInt(inputMins) || 45;
    const p = buildTimerPhases(m);
    setPhases(p); setPhaseIdx(0); setTimeLeft(p[0].duration);
    setScreen("timer"); setRunning(true);
  }

  function resetTimer() {
    setRunning(false); clearInterval(tickRef.current);
    setScreen("setup"); setPhases([]); setPhaseIdx(0); setTimeLeft(0);
    saveTimerState(null);
  }

  const curPhase = phases[phaseIdx];
  const totalDur = curPhase?.duration || 1;
  const ringProgress = curPhase ? (totalDur - timeLeft) / totalDur : 0;
  const mins = parseInt(inputMins) || 0;
  const focusMins = mins > 25 ? Math.floor((mins - BREAK_MINS_CONST) / 2) : mins;

  const cardBg = "rgba(255,255,255,0.05)";
  const border = "1px solid rgba(255,255,255,0.1)";

  return (
    <motion.div variants={fadeSlideUp} initial="hidden" animate="show"
      style={{ maxWidth: 440, margin: "0 auto", padding: "8px 0", background: "#010409", minHeight: "100%" }}>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#E6EDF3" }}>⏱ Study Timer</div>
        <div style={{ fontSize: 12, color: "#8B949E", marginTop: 3 }}>Focus sessions synced with your tracker</div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {[["Sessions", timerStats.sessions], ["XP Earned", timerStats.xp], ["Streak 🔥", timerStats.streak]].map(([lbl, val]) => (
          <div key={lbl} style={{ flex: 1, background: cardBg, border, borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#E6EDF3" }}>{val}</div>
            <div style={{ fontSize: 10, color: "#8B949E", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{lbl}</div>
          </div>
        ))}
      </div>

      {screen === "setup" && (
        <div style={{ background: cardBg, border, borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#8B949E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Session length (minutes)</div>
            <input type="number" min="5" max="180" value={inputMins}
              onChange={e => setInputMins(e.target.value)}
              placeholder="e.g. 45"
              style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, color: "#E6EDF3", fontSize: 16, padding: "10px 14px", outline: "none" }} />
          </div>
          {mins > 25 && (
            <div style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 10, color: "#c4b5fd", fontSize: 12, padding: "10px 14px", lineHeight: 1.6 }}>
              ⚡ {focusMins} min focus &nbsp;·&nbsp; ☕ 5 min break &nbsp;·&nbsp; ⚡ {focusMins} min focus
            </div>
          )}
          {mins > 0 && mins <= 25 && (
            <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 10, color: "#a5b4fc", fontSize: 12, padding: "10px 14px" }}>
              ⚡ Single focus session · {mins} min
            </div>
          )}
          <button onClick={startSession}
            style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)", border: "none", borderRadius: 12, color: "#fff", cursor: "pointer", fontSize: 15, fontWeight: 700, padding: "12px", width: "100%" }}>
            Start session
          </button>
        </div>
      )}

      {screen === "timer" && curPhase && (
        <div style={{ background: cardBg, border, borderRadius: 16, padding: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#E6EDF3" }}>
              {curPhase.type === "focus" ? `Focus ${curPhase.index}/${curPhase.of}` : "Break"}
            </div>
            <div style={{ fontSize: 11, color: "#8B949E", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {curPhase.type === "focus" ? "Deep work mode" : "Rest · stretch · breathe"}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", position: "relative", marginBottom: 20 }}>
            <TimerRing progress={ringProgress} type={curPhase.type} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ color: "#E6EDF3", fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>{fmtTime(timeLeft)}</div>
              <div style={{ color: "#8B949E", fontSize: 10, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{running ? "running" : "paused"}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
            {phases.map((p, i) => {
              const status = i < phaseIdx ? "done" : i === phaseIdx ? "active" : "upcoming";
              const bg = status === "done" ? "rgba(34,197,94,0.15)" : status === "active" ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.05)";
              const bc = status === "done" ? "rgba(34,197,94,0.4)" : status === "active" ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.1)";
              const tc = status === "done" ? "#86efac" : status === "active" ? "#c4b5fd" : "#484F58";
              const icon = p.type === "break" ? "☕" : "⚡";
              const lbl = p.type === "break" ? "Break" : `Focus ${p.index}/${p.of}`;
              return (
                <div key={i} style={{ background: bg, border: `1px solid ${bc}`, borderRadius: 8, color: tc, fontSize: 11, fontWeight: 600, padding: "5px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span>{lbl}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setRunning(r => !r)}
              style={{ flex: 1, background: "linear-gradient(135deg,#8b5cf6,#6366f1)", border: "none", borderRadius: 10, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, padding: "10px" }}>
              {running ? "⏸ Pause" : "▶ Resume"}
            </button>
            <button onClick={resetTimer}
              style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, color: "#fca5a5", cursor: "pointer", fontSize: 14, fontWeight: 600, padding: "10px 16px" }}>
              ↺ Reset
            </button>
          </div>
        </div>
      )}

      {screen === "done" && (
        <div style={{ background: cardBg, border, borderRadius: 16, padding: 24, textAlign: "center" }}>
          <div style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 12, color: "#86efac", fontSize: 14, fontWeight: 600, padding: "12px", marginBottom: 20 }}>
            ✓ Session complete! &nbsp;
            <span style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", borderRadius: 6, color: "#c4b5fd", fontSize: 11, fontWeight: 700, padding: "2px 7px" }}>+50 XP</span>
          </div>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
          <div style={{ color: "#E6EDF3", fontSize: 16, fontWeight: 600 }}>Great work today</div>
          <div style={{ color: "#8B949E", fontSize: 13, marginTop: 4, marginBottom: 20 }}>Activity logged to your DSA tracker</div>
          <button onClick={resetTimer}
            style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)", border: "none", borderRadius: 12, color: "#fff", cursor: "pointer", fontSize: 15, fontWeight: 700, padding: "12px", width: "100%" }}>
            Start another session
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// NAV
// ════════════════════════════════════════════════════════════════════════════
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "roadmap", label: "A2Z Roadmap", icon: "◈" },
  { id: "problems", label: "Problems", icon: "≡" },
  { id: "practice", label: "🎲 Practice", icon: "" },
  { id: "timer", label: "⏱ Study Timer", icon: "" },
];

// ════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selected, setSelected] = useState(null);
  const [progress, setProgress] = useState(load);
  const [activity, setActivity] = useState(loadActivity);
  const [practice, setPractice] = useState(loadPractice);
  const [settings, setSettings] = useState(loadSettings);
  const [profile, setProfile] = useState(loadProfile);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => { save(progress); }, [progress]);
  useEffect(() => { saveActivity(activity); }, [activity]);
  useEffect(() => { savePractice(practice); }, [practice]);
  useEffect(() => { saveSettings(settings); }, [settings]);
  useEffect(() => { saveProfile(profile); }, [profile]);

  const updateProgress = (id, data) => setProgress(p => ({ ...p, [id]: { ...(p[id] || {}), ...data } }));
  const bumpActivityState = (dateKey, by = 1) => setActivity(a => bumpActivity(a, dateKey, by));
  const setDailyGoal = (n) => setSettings(s => ({ ...s, dailyGoal: Math.max(1, Math.min(50, n)) }));
  const navigate = (p) => { setPage(p); setSelected(null); setSidebarOpen(false); };

  const startQuickPractice = () => {
    const questions = generatePracticeSet(progress, { topic: "Any", difficulties: ["Any"], sources: [...STATUS_SOURCES], count: 5 });
    setPractice({ questionIds: questions.map(q => q.id), completed: {}, createdAt: todayKey(), filters: { topic: "Any", diffs: ["Any"], sources: [...STATUS_SOURCES], count: 5 } });
    navigate("practice");
  };

  const handleImport = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.progress) setProgress(data.progress);
        if (data.activity) setActivity(data.activity);
      } catch { alert("Invalid backup file."); }
    };
    reader.readAsText(file);
  };

  const solved = ALL_PROBLEMS.filter(p => ["Solved", "Revised"].includes(progress[p.id]?.status)).length;
  const total = ALL_PROBLEMS.length;
  const activePage = selected ? null : page;

  const initials = profile.name ? profile.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "?";

  const SidebarContent = () => (
    <>
      {/* Logo / header — clickable to open profile */}
      <button onClick={() => { setProfileOpen(true); setSidebarOpen(false); }}
        style={{ width: "100%", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", borderBottom: "1px solid #21262D", cursor: "pointer", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Avatar */}
          <div style={{
            width: 34, height: 34, borderRadius: 9, flexShrink: 0,
            background: `linear-gradient(135deg, ${profile.avatarColor}, ${profile.avatarColor}88)`,
            border: `1px solid ${profile.avatarColor}50`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 800, color: "#fff",
            boxShadow: `0 0 10px ${profile.avatarColor}30`,
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#E6EDF3", lineHeight: 1.3 }}>A2Z Revision Hub</div>
            <div style={{ fontSize: 10, color: "#8B949E" }}>Personal DSA Journey</div>
          </div>
        </div>
        <span style={{ color: "#484F58", fontSize: 10 }}>→</span>
      </button>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 3, position: "relative" }}>
        {NAV.map(({ id, label }) => {
          const active = activePage === id;
          return (
            <motion.button key={id} onClick={() => navigate(id)}
              whileHover={!active ? { x: 2 } : {}}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px 10px 10px", borderRadius: 7,
                position: "relative",
                color: active ? "#C4B5FD" : "#8B949E",
                border: "none",
                cursor: "pointer", fontSize: 14, fontWeight: active ? 600 : 400,
                textAlign: "left",
                background: "transparent",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#C9D1D9"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#8B949E"; }}>
              {active && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute", inset: 0, borderRadius: 7,
                    background: "rgba(167,139,250,.15)",
                    borderLeft: "3px solid #A78BFA",
                    zIndex: 0,
                  }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1, width: 7, height: 7, borderRadius: "50%", flexShrink: 0, background: active ? "#A78BFA" : "transparent", border: active ? "none" : "1px solid #484F58" }} />
              <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Stats footer */}
      <div style={{ padding: "14px 16px", borderTop: "1px solid #21262D", flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: "#8B949E", marginBottom: 4 }}>Overall Progress</div>
        <div style={{ fontSize: 14, fontFamily: "monospace", color: "#E6EDF3", marginBottom: 6 }}>
          <span style={{ color: "#3FB950", fontWeight: 700 }}>{solved}</span>
          <span style={{ color: "#484F58" }}> / {total}</span>
        </div>
        <ProgressBar value={solved} max={total} color="#A78BFA" height={3} />
      </div>
    </>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#010409", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif", color: "#E6EDF3" }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:#0D1117}
        ::-webkit-scrollbar-thumb{background:#30363D;border-radius:3px}
        select option{background:#161B22;color:#E6EDF3}
        a{text-decoration:none}
        button{font-family:inherit}
        input,textarea,select{font-family:inherit}
        .sidebar-desktop{display:flex}
        .main-offset{margin-left:210px}
        @media (max-width:700px){
          .sidebar-desktop{display:none!important}
          .main-offset{margin-left:0!important}
          .hamburger{display:flex!important}
          .two-col{grid-template-columns:1fr!important}
          .social-grid{grid-template-columns:1fr!important}
        }
        @media (prefers-reduced-motion:reduce){
          *{transition:none!important;animation:none!important}
        }
      `}</style>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        progress={progress}
        activity={activity}
        profile={profile}
        onSaveProfile={(p) => { setProfile(p); saveProfile(p); }}
      />

      {/* Desktop Sidebar */}
      <aside className="sidebar-desktop" style={{ width: 210, background: "#0D1117", borderRight: "1px solid #21262D", flexDirection: "column", flexShrink: 0, position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 30, overflowY: "auto" }}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", zIndex: 40 }} />
          <aside style={{ position: "fixed", top: 0, left: 0, width: 220, height: "100vh", background: "#0D1117", borderRight: "1px solid #21262D", display: "flex", flexDirection: "column", zIndex: 50, overflowY: "auto", boxShadow: "4px 0 20px rgba(0,0,0,.5)" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 12px 0" }}>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "1px solid #21262D", borderRadius: 6, color: "#8B949E", cursor: "pointer", padding: "4px 10px", fontSize: 14 }}>✕</button>
            </div>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main content */}
      <div className="main-offset" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: "#010409", minHeight: "100vh" }}>
        {/* Topbar */}
        <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(1,4,9,.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #21262D", padding: "11px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <button className="hamburger" onClick={() => setSidebarOpen(true)}
            style={{ display: "none", alignItems: "center", justifyContent: "center", background: "none", border: "1px solid #21262D", borderRadius: 6, color: "#8B949E", cursor: "pointer", padding: "5px 8px", fontSize: 16, lineHeight: 1 }}>
            ☰
          </button>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#E6EDF3", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {selected ? selected.name : NAV.find(n => n.id === page)?.label}
          </span>
          {/* Profile button in topbar */}
          <button onClick={() => setProfileOpen(true)}
            style={{ width: 32, height: 32, borderRadius: 8, background: `${profile.avatarColor}18`, border: `1px solid ${profile.avatarColor}40`, color: "#E6EDF3", fontSize: 11, fontWeight: 800, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {initials}
          </button>
          <span style={{ fontSize: 12, color: "#8B949E", fontFamily: "monospace", flexShrink: 0 }}>
            <span style={{ color: "#3FB950" }}>{solved}</span>
            <span style={{ color: "#484F58" }}> / {total}</span>
          </span>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#010409" }}>
          {selected
            ? <ProblemDetail problem={selected} progress={progress} onBack={() => setSelected(null)} onUpdate={updateProgress} onActivity={bumpActivityState} />
            : page === "dashboard" ? <Dashboard progress={progress} activity={activity} settings={settings} onSetDailyGoal={setDailyGoal} onNavigate={navigate} onImport={handleImport} onSelectProblem={p => setSelected(p)} onQuickPractice={startQuickPractice} />
              : page === "roadmap" ? <Roadmap progress={progress} onSelectProblem={p => setSelected(p)} />
                : page === "problems" ? <ProblemList progress={progress} onSelect={p => setSelected(p)} />
                  : page === "practice" ? <PracticeMode progress={progress} practice={practice} setPractice={setPractice} onSelectProblem={p => setSelected(p)} />
                    : page === "timer" ? <StudyTimer onBumpActivity={() => bumpActivityState(todayKey())} />
                    : null
          }
        </main>
      </div>
    </div>
  );
}
