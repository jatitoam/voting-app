<template>
  <div>
    <h1 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Vota por una Propuesta</h1>
    <p class="mb-6 text-gray-700 dark:text-gray-300">
      Por favor, vota por tu tema favorito de la clase hasta ahora. Tu voto nos ayudará a mejorar las futuras clases.
    </p>
    <div v-if="proposals.length === 0" class="text-gray-700 dark:text-gray-300">Cargando propuestas...</div>
    <ul v-else class="space-y-4">
      <li
        v-for="(proposal, index) in proposals"
        :key="index"
        class="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded shadow"
      >
        <div class="flex flex-col">
          <span class="font-medium text-gray-900 dark:text-white">{{ proposal.description }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Votos: <span class="font-bold text-lg text-gray-900 dark:text-white">{{ proposal.voteCount }}</span>
          </span>
        </div>
        <button
          @click="vote(index)"
          class="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800"
        >
          Votar
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../contract";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      proposals: [],
      contract: null,
    };
  },
  methods: {
    async connectToBlockchain() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        this.contract = new ethers.Contract(contractAddress, contractABI, signer);
        this.loadPropuestas();
      } else {
        Swal.fire(
          "MetaMask No Instalado",
          "Por favor, instala MetaMask para usar esta aplicación.",
          "warning"
        );
      }
    },
    async loadPropuestas() {
      try {
        const proposals = await this.contract.getAllProposals();
        this.proposals = proposals.map((proposal) => ({
          description: proposal.description,
          voteCount: proposal.voteCount.toString(),
        }));
      } catch (error) {
        Swal.fire(
          "Error al Cargar Propuestas",
          "Hubo un error al cargar las propuestas. Por favor, inténtalo de nuevo más tarde.",
          "error"
        );
      }
    },
    async vote(proposalIndex) {
      try {
        const tx = await this.contract.vote(proposalIndex);
        await tx.wait();
        Swal.fire(
          "Voto Exitoso",
          `Has votado exitosamente por la propuesta "${this.proposals[proposalIndex].description}".`,
          "success"
        );
        this.loadPropuestas();
      } catch (error) {
        const errorMessage =
          error.error && error.error.message
            ? error.error.message.split(":")[1]
            : error.reason || error.message || "Hubo un error al procesar tu voto.";
        Swal.fire(
          "Error al Votar",
          errorMessage,
          "error"
        );
      }
    },
  },
  mounted() {
    this.connectToBlockchain();
  },
};
</script>

<style>
</style>