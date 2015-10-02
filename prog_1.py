from snap import *

nodes = [0, 107, 348, 414, 686,698, 1684, 1912, 3437, 3980]
graph = TUNGraph.New()
with open("./files/facebook_combined.txt") as combined_file:
    for line in combined_file:
        x = [int(i) for i in line.split()]
        if not graph.IsNode(x[0]):
            graph.AddNode(x[0])
        if not graph.IsNode(x[1]):
            graph.AddNode(x[1])
        if not graph.IsEdge(x[0], x[1]):
            graph.AddEdge(x[0], x[1])

print("Number of nodes : %d") %graph.GetNodes()
print("Number of edges : %d") % graph.GetEdges()
blah = TIntFltH()
halb = TIntPrFltH()
NodeFrac = float()
GetBetweennessCentr(graph, blah, halb, 1.0)
clust_coeff = GetClustCf(graph, -1)

for node in nodes:
    print("Betweeness centrality for %d is %f"%(node, blah[node]))
print("Clustering coefficient %f"%clust_coeff)


